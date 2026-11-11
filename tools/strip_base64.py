#!/usr/bin/env python3
"""Replace base64-encoded logo PNG in layout HTML files with a URL reference.
Also convert all layout pieces to JSX component files."""
import re
import json
from pathlib import Path

LAYOUT_DIR = Path('/home/z/my-project/scripts/_extracted/layout')
OUT_DIR = Path('/home/z/my-project/src/components/layout')
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Read all layout pieces
pieces = {}
for f in LAYOUT_DIR.iterdir():
    if f.suffix == '.html':
        pieces[f.stem] = f.read_text(encoding='utf-8')

# Replace base64 PNG with /unizar/logo144.png
b64_pattern = re.compile(r'src="data:image/png;base64,[A-Za-z0-9+/=]+"')
for k, v in pieces.items():
    new_v = b64_pattern.sub('src="/unizar/logo144.png"', v)
    if new_v != v:
        print(f'Replaced base64 in {k}: {len(v)} -> {len(new_v)} chars')
        pieces[k] = new_v

# Save updated HTML
for k, v in pieces.items():
    (LAYOUT_DIR / f'{k}.html').write_text(v, encoding='utf-8')

print(f'\nUpdated {len(pieces)} layout pieces.')
