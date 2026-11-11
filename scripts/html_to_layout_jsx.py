#!/usr/bin/env python3
"""Convert layout HTML pieces to React JSX component files."""
import re
import json
import sys
from pathlib import Path

# Import converter from html_to_jsx.py
sys.path.insert(0, '/home/z/my-project/scripts')
from html_to_jsx import convert_html_to_jsx, kebab_to_pascal, VOID_TAGS, ATTR_RENAMES, SVG_RENAMES

LAYOUT_DIR = Path('/home/z/my-project/scripts/_extracted/layout')
OUT_DIR = Path('/home/z/my-project/src/components/layout')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Component name mapping (some need to be renamed because mega-mega-profil is awkward)
NAME_MAP = {
    'util': 'UtilBar',
    'header': 'SiteHeader',
    'footer': 'SiteFooter',
    'drawer': 'MobileDrawer',
    'search': 'SearchOverlay',
    'bbar': 'BottomBar',
    'mock-pill': 'MockupPill',
    'mega-mega-profil': 'MegaMenuProfil',
    'mega-mega-fakultas': 'MegaMenuFakultas',
    'mega-mega-direktori': 'MegaMenuDirektori',
    'mega-mega-tata-kelola': 'MegaMenuTataKelola',
    'mega-mega-pendidikan': 'MegaMenuPendidikan',
    'mega-mega-penelitian': 'MegaMenuPenelitian',
    'mega-mega-pengabdian': 'MegaMenuPengabdian',
    'mega-mega-penjaminan-mutu': 'MegaMenuPenjaminanMutu',
}

# Map of file -> additional imports needed
# (none for now - they're all presentational)

for f in sorted(LAYOUT_DIR.iterdir()):
    if f.suffix != '.html':
        continue
    stem = f.stem
    comp_name = NAME_MAP.get(stem)
    if not comp_name:
        comp_name = kebab_to_pascal(stem.replace('mega-', 'mega_'))
    html = f.read_text(encoding='utf-8')
    jsx = convert_html_to_jsx(html)
    out_file = OUT_DIR / f'{comp_name}.tsx'
    out_file.write_text(
        f"""// Layout component: {stem}
// Auto-generated from original index.html. Edit JSX directly to customize.
export function {comp_name}() {{
  return (
    {jsx}
  );
}}
""", encoding='utf-8')
    print(f'  {comp_name}.tsx ({len(jsx)} chars)')

print(f'\nGenerated {len(list(LAYOUT_DIR.glob("*.html")))} layout components.')
