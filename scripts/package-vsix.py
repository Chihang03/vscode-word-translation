"""Build a local VSIX from this dependency-free extension using Python's standard library."""
import argparse
import json
from pathlib import Path
import xml.etree.ElementTree as ET
import zipfile

ROOT = Path(__file__).resolve().parents[1]
NS = 'http://schemas.microsoft.com/developer/vsx-schema/2011'
ET.register_namespace('', NS)

def build(output):
    package = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))
    def node(parent, name, attrs=None, text=None):
        element = ET.SubElement(parent, '{' + NS + '}' + name, attrs or {})
        element.text = text
        return element
    manifest = ET.Element('{' + NS + '}PackageManifest', {'Version': '2.0.0'})
    metadata = node(manifest, 'Metadata')
    node(metadata, 'Identity', {'Language': 'en-US', 'Id': package['name'], 'Version': package['version'], 'Publisher': package['publisher']})
    node(metadata, 'DisplayName', text=package['displayName'])
    node(metadata, 'Description', {'{http://www.w3.org/XML/1998/namespace}space': 'preserve'}, package['description'])
    node(metadata, 'Categories', text=','.join(package.get('categories', [])))
    properties = node(metadata, 'Properties')
    node(properties, 'Property', {'Id': 'Microsoft.VisualStudio.Code.Engine', 'Value': package['engines']['vscode']})
    node(metadata, 'License', text='extension/LICENSE')
    node(metadata, 'Icon', text='extension/icon.png')
    installation = node(manifest, 'Installation')
    node(installation, 'InstallationTarget', {'Id': 'Microsoft.VisualStudio.Code'})
    node(manifest, 'Dependencies')
    assets = node(manifest, 'Assets')
    for kind, path in [('Microsoft.VisualStudio.Code.Manifest', 'package.json'), ('Microsoft.VisualStudio.Services.Content.Details', 'README.md'), ('Microsoft.VisualStudio.Services.Content.License', 'LICENSE'), ('Microsoft.VisualStudio.Services.Icons.Default', 'icon.png')]:
        node(assets, 'Asset', {'Type': kind, 'Path': 'extension/' + path, 'Addressable': 'true'})
    types = ET.Element('Types', {'xmlns': 'http://schemas.openxmlformats.org/package/2006/content-types'})
    for extension, mime in [('json', 'application/json'), ('js', 'application/javascript'), ('md', 'text/markdown'), ('png', 'image/png'), ('vsixmanifest', 'text/xml'), ('', 'application/octet-stream')]:
        ET.SubElement(types, 'Default', {'Extension': extension, 'ContentType': mime})
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        archive.writestr('extension.vsixmanifest', ET.tostring(manifest, encoding='utf-8', xml_declaration=True))
        archive.writestr('[Content_Types].xml', ET.tostring(types, encoding='utf-8', xml_declaration=True))
        archive.writestr('extension/package.json', json.dumps(package, ensure_ascii=False, indent=2) + '\n')
        for name in ['extension.js', 'README.md', 'CHANGELOG.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'icon.png']:
            archive.write(ROOT / name, 'extension/' + name)
        for path in sorted((ROOT / 'src').rglob('*')):
            if path.is_file():
                archive.write(path, 'extension/' + path.relative_to(ROOT).as_posix())
    with zipfile.ZipFile(output) as archive:
        if archive.testzip() is not None:
            raise RuntimeError('VSIX integrity validation failed')
        actual = json.loads(archive.read('extension/package.json'))
        assert actual['version'] == package['version']
        assert actual['publisher'] == package['publisher']
    print(f"Created {output} ({package['publisher']}.{package['name']} {package['version']})")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    build(args.output)
