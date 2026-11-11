#!/usr/bin/env python3
"""Extract structural pieces (header, mega-menus, drawer, search, footer, bbar, etc.)
from preamble.html and postamble.html. Each piece becomes its own HTML chunk that
we will then convert to a React component."""
import re
import json
from pathlib import Path
from html.parser import HTMLParser

SRC_DIR = Path('/home/z/my-project/scripts/_extracted')
OUT_DIR = Path('/home/z/my-project/scripts/_extracted/layout')
OUT_DIR.mkdir(parents=True, exist_ok=True)

preamble = (SRC_DIR / 'preamble.html').read_text(encoding='utf-8')
postamble = (SRC_DIR / 'postamble.html').read_text(encoding='utf-8')

# Strip scripts to avoid extracting JS strings as HTML
def strip_scripts(s):
    return re.sub(r'<script[^>]*>.*?</script>', '', s, flags=re.DOTALL)

pre_no_js = strip_scripts(preamble)
post_no_js = strip_scripts(postamble)


class BlockExtractor(HTMLParser):
    """Find a top-level element matching a selector and return its full outer HTML."""
    def __init__(self, src):
        super().__init__(convert_charrefs=True)
        self.src = src
        self.target_tag = None
        self.target_id = None
        self.target_class = None
        self.target_tag_pos = None
        self.depth = 0
        self.start_pos = None
        self.end_pos = None
        self._line_starts = None

    def find(self, html_src, tag=None, id_=None, class_=None):
        self.target_tag = tag.lower() if tag else None
        self.target_id = id_
        self.target_class = class_
        self.depth = 0
        self.start_pos = None
        self.end_pos = None
        self.feed(html_src)
        if self.start_pos is not None and self.end_pos is not None:
            return html_src[self.start_pos:self.end_pos]
        return None

    def _offset(self):
        line, col = self.getpos()
        if self._line_starts is None:
            self._line_starts = [0]
            for i, ch in enumerate(self.src):
                if ch == '\n':
                    self._line_starts.append(i + 1)
        return self._line_starts[line - 1] + col

    def handle_starttag(self, t, attrs):
        d = dict(attrs)
        if self.depth == 0:
            # Looking for the target
            if (self.target_tag is None or t.lower() == self.target_tag):
                id_match = (self.target_id is None) or (d.get('id') == self.target_id)
                cls_match = True
                if self.target_class:
                    classes = (d.get('class') or '').split()
                    cls_match = self.target_class in classes
                if id_match and cls_match and d.get('id') != 'main':
                    # Start! But only if not 'main' which is the page wrapper
                    self.start_pos = self._offset()
                    self.depth = 1
                    return
        else:
            # We're inside target. If same tag opens, increase depth
            if t.lower() == self.target_tag:
                self.depth += 1

    def handle_startendtag(self, t, attrs):
        # Self-closing
        if self.depth == 1 and t.lower() == self.target_tag:
            # target was self-closing
            self.end_pos = self._offset() + len(re.match(r'<[^>]+/>', self.src[self._offset():]).group(0))
            self.depth = 0

    def handle_endtag(self, t):
        if self.depth > 0:
            if t.lower() == self.target_tag:
                self.depth -= 1
                if self.depth == 0:
                    # End of target
                    end_off = self._offset()
                    close_end = self.src.find('>', end_off) + 1
                    self.end_pos = close_end


def find_block(src, tag=None, id_=None, class_=None):
    e = BlockExtractor(src)
    return e.find(src, tag=tag, id_=id_, class_=class_)


# Extract from preamble: util bar, header, mega menus, skip link, main wrapper open tag
pieces = {}

# Util bar (the top dark bar)
util = find_block(preamble, tag='div', class_='util')
if util:
    pieces['util'] = util
    print(f'util: {len(util)} chars')

# Header (contains nav, seal, etc.)
hdr = find_block(preamble, tag='header', class_='hdr')
if hdr:
    pieces['header'] = hdr
    print(f'header: {len(hdr)} chars')

# Mega menus (each is a <div class="mega" id="mega-X">)
mega_pattern = re.compile(r'<div[^>]*class="[^"]*\bmega\b[^"]*"[^>]*id="(mega-[^"]+)"[^>]*>', re.IGNORECASE)
for m in mega_pattern.finditer(preamble):
    mega_id = m.group(1)
    # Find the closing </div> at the right depth
    # Re-parse from this position
    sub_src = preamble[m.start():]
    e = BlockExtractor(sub_src)
    block = e.find(sub_src, tag='div', id_=mega_id)
    if block:
        pieces[f'mega-{mega_id}'] = block
        print(f'mega-{mega_id}: {len(block)} chars')

# Extract from postamble: footer, drawer, search, mock-pill, bbar
# Footer
footer = find_block(post_no_js, tag='footer')
if footer:
    pieces['footer'] = footer
    print(f'footer: {len(footer)} chars')

# Drawer (div id="drawer")
drawer = find_block(post_no_js, tag='div', id_='drawer')
if drawer:
    pieces['drawer'] = drawer
    print(f'drawer: {len(drawer)} chars')

# Search overlay (div id="search")
search = find_block(post_no_js, tag='div', id_='search')
if search:
    pieces['search'] = search
    print(f'search: {len(search)} chars')

# Bbar (nav class="bbar")
bbar = find_block(post_no_js, tag='nav', class_='bbar')
if bbar:
    pieces['bbar'] = bbar
    print(f'bbar: {len(bbar)} chars')

# Mock pill (div class="mock-pill")
mock_pill = find_block(post_no_js, tag='div', class_='mock-pill')
if mock_pill:
    pieces['mock-pill'] = mock_pill
    print(f'mock-pill: {len(mock_pill)} chars')

# Rail (the left-side "Akses Cepat" - probably added by JS based on the script 'document.body.classList.add("has-rail");')
# Let's look for any 'rail' class
rail = find_block(post_no_js, tag='nav', class_='rail')
if rail:
    pieces['rail'] = rail
    print(f'rail: {len(rail)} chars')
else:
    # Try as aside or div
    rail = find_block(post_no_js, tag='aside', class_='rail')
    if rail:
        pieces['rail'] = rail
        print(f'rail (aside): {len(rail)} chars')
    else:
        print('rail: NOT FOUND (probably built by JS dynamically)')

# Save each piece
for name, html in pieces.items():
    safe = name.replace('/', '_')
    (OUT_DIR / f'{safe}.html').write_text(html, encoding='utf-8')

# Also dump a manifest
(OUT_DIR / 'manifest.json').write_text(
    json.dumps({k: len(v) for k, v in pieces.items()}, indent=2),
    encoding='utf-8')
print(f'\nSaved {len(pieces)} layout pieces to {OUT_DIR}')
