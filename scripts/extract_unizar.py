#!/usr/bin/env python3
"""Extract CSS, JSON data, and section HTML from the original index.html
so we can convert them to Next.js / React assets."""
import json
import os
import re
from pathlib import Path
from html.parser import HTMLParser

SRC = Path('/home/z/my-project/upload/mockup-website-unizar-v9/mockup-website-unizar-v9/index.html')
OUT = Path('/home/z/my-project/scripts/_extracted')
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'sections').mkdir(exist_ok=True)
(OUT / 'json').mkdir(exist_ok=True)

content = SRC.read_text(encoding='utf-8')
print(f'Total content size: {len(content)} chars')

# ---------- 1. Extract the inline <style> in <head> ----------
style_match = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
css = style_match.group(1)
(OUT / 'unizar.css').write_text(css, encoding='utf-8')
print(f'Extracted CSS: {len(css)} chars -> unizar.css')

# ---------- 2. Extract JSON data blocks ----------
json_blocks = re.findall(
    r'<script[^>]*type="application/json"[^>]*id="([^"]+)"[^>]*>(.*?)</script>',
    content, re.DOTALL)
for id_, body in json_blocks:
    fname = id_.replace('-', '_') + '.json'
    (OUT / 'json' / fname).write_text(body.strip(), encoding='utf-8')
    print(f'  JSON {id_}: {len(body)} chars -> json/{fname}')

# ---------- 3. Find body content range ----------
body_open_match = re.search(r'<body[^>]*>', content)
body_open_end = body_open_match.end()
body_close = content.rfind('</body>')
body = content[body_open_end:body_close]

# ---------- 4. Extract each section by id ----------
class SectionExtractor(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src
        self.sections = []
        self.stack = []
        self._line_starts = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() != 'section':
            return
        attrs_d = dict(attrs)
        sid = attrs_d.get('id')
        pos = self.getpos()
        offset = self._pos_to_offset(pos[0], pos[1])
        self.stack.append((sid, offset, attrs_d))

    def handle_startendtag(self, tag, attrs):
        # self-closing - ignore for section (not valid)
        pass

    def handle_endtag(self, tag):
        if tag.lower() != 'section':
            return
        if not self.stack:
            return
        sid, start_off, attrs = self.stack.pop()
        pos = self.getpos()
        end_off = self._pos_to_offset(pos[0], pos[1])
        close_end = self.src.find('>', end_off) + 1
        self.sections.append((sid, start_off, close_end, attrs))

    def _pos_to_offset(self, line, col):
        if self._line_starts is None:
            self._line_starts = [0]
            for i, ch in enumerate(self.src):
                if ch == '\n':
                    self._line_starts.append(i + 1)
        return self._line_starts[line - 1] + col

p = SectionExtractor(body)
p.feed(body)
sections = p.sections
print(f'\nTotal <section> elements found: {len(sections)}')

manifest = []
for sid, s, e, attrs in sections:
    chunk = body[s:e]
    fname = (sid or 'no-id') + '.html'
    safe = fname.replace('/', '_')
    (OUT / 'sections' / safe).write_text(chunk, encoding='utf-8')
    manifest.append({
        'id': sid,
        'start': s,
        'end': e,
        'length': e - s,
        'attrs': attrs,
    })

(OUT / 'manifest.json').write_text(
    json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')

top_level = [m for m in manifest if m['id'] and m['id'].startswith('p-')]
print(f'\nTop-level pages: {len(top_level)}')
for m in top_level:
    print(f"  {m['id']}: {m['length']} chars")

sub_pages = [m for m in manifest if m['id'] and not m['id'].startswith('p-')]
print(f'\nSub-sections: {len(sub_pages)}')

first_page_offset = min(m['start'] for m in top_level)
preamble = body[:first_page_offset]
(OUT / 'preamble.html').write_text(preamble, encoding='utf-8')
print(f'\nPreamble (header + menus + drawer + search): {len(preamble)} chars')

last_section_end = max(m['end'] for m in manifest)
postamble = body[last_section_end:]
(OUT / 'postamble.html').write_text(postamble, encoding='utf-8')
print(f'Postamble (footer + scripts): {len(postamble)} chars')

print('\nDone.')
