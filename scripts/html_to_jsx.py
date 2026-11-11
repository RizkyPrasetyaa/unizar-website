#!/usr/bin/env python3
"""Convert extracted HTML sections to React JSX component files.

For each top-level page (p-X), extract its sub-sections (X--Y) into separate files
and replace them in the parent with component placeholders. This gives a clean
"edit per section" experience: each menu = one folder, each sub-section = one file.
"""
import json
import os
import re
from pathlib import Path
from html.parser import HTMLParser

SRC_DIR = Path('/home/z/my-project/scripts/_extracted/sections')
OUT_DIR = Path('/home/z/my-project/src/components/sections')
OUT_DIR.mkdir(parents=True, exist_ok=True)

VOID_TAGS = {
    'area','base','br','col','embed','hr','img','input','link','meta',
    'param','source','track','wbr','path','circle','rect','ellipse',
    'line','polyline','polygon','stop','use','image'
}

ATTR_RENAMES = {
    'class': 'className',
    'for': 'htmlFor',
    'tabindex': 'tabIndex',
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus',
    'maxlength': 'maxLength',
    'minlength': 'minLength',
    'enctype': 'encType',
    'readonly': 'readOnly',
    'spellcheck': 'spellCheck',
    'srcset': 'srcSet',
    'usemap': 'useMap',
    'ismap': 'isMap',
    'crossorigin': 'crossOrigin',
    'datetime': 'dateTime',
    'charset': 'charSet',
    'http-equiv': 'httpEquiv',
    'contenteditable': 'contentEditable',
    'accesskey': 'accessKey',
    'novalidate': 'noValidate',
    'formaction': 'formAction',
    'formenctype': 'formEncType',
    'formmethod': 'formMethod',
    'formtarget': 'formTarget',
    'formnovalidate': 'formNoValidate',
    'inputmode': 'inputMode',
    'playsinline': 'playsInline',
    'defaultchecked': 'defaultChecked',
    'defaultvalue': 'defaultValue',
}

SVG_RENAMES = {
    'viewbox': 'viewBox',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-opacity': 'strokeOpacity',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-miterlimit': 'strokeMiterlimit',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'fill-opacity': 'fillOpacity',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'clip-path': 'clipPath',
    'color-interpolation-filters': 'colorInterpolationFilters',
    'flood-color': 'floodColor',
    'flood-opacity': 'floodOpacity',
    'lighting-color': 'lightingColor',
    'gradientunits': 'gradientUnits',
    'gradienttransform': 'gradientTransform',
    'spreadmethod': 'spreadMethod',
    'marker-end': 'markerEnd',
    'marker-mid': 'markerMid',
    'marker-start': 'markerStart',
    'maskunits': 'maskUnits',
    'maskcontentunits': 'maskContentUnits',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'text-rendering': 'textRendering',
    'shape-rendering': 'shapeRendering',
    'paint-order': 'paintOrder',
    'xlink:href': 'xlinkHref',
    'xlink:title': 'xlinkTitle',
    'xmlns:xlink': 'xmlnsXlink',
    'xml:space': 'xmlSpace',
    'xml:lang': 'xmlLang',
    'preserveaspectratio': 'preserveAspectRatio',
    'attributename': 'attributeName',
    'attributetype': 'attributeType',
    'repeatcount': 'repeatCount',
    'repeatdur': 'repeatDur',
    'calcmode': 'calcMode',
    'keytimes': 'keyTimes',
    'keysplines': 'keySplines',
    'pathlength': 'pathLength',
    'textlength': 'textLength',
    'lengthadjust': 'lengthAdjust',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'font-style': 'fontStyle',
}


def rename_attr(name):
    ln = name.lower()
    if ln.startswith('data-') or ln.startswith('aria-'):
        return name
    if ln in ATTR_RENAMES:
        return ATTR_RENAMES[ln]
    if ln in SVG_RENAMES:
        return SVG_RENAMES[ln]
    if '-' in ln and not ln.startswith('data-') and not ln.startswith('aria-'):
        parts = ln.split('-')
        return parts[0] + ''.join(p.capitalize() for p in parts[1:])
    return name


def parse_style(style_str):
    if not style_str.strip():
        return ''
    pairs = []
    for decl in style_str.split(';'):
        decl = decl.strip()
        if not decl or ':' not in decl: continue
        k, v = decl.split(':', 1)
        k = k.strip()
        v = v.strip()
        if '-' in k:
            parts = k.split('-')
            k = parts[0] + ''.join(p.capitalize() for p in parts[1:])
        v_escaped = v.replace("'", "\\'").replace('"', '\\"')
        pairs.append(f"'{k}': '{v_escaped}'")
    return ', '.join(pairs)


def attr_to_jsx(name, value):
    jsx_name = rename_attr(name)
    if value is None:
        return jsx_name
    if name.lower() == 'style':
        return f'style={{{{{parse_style(value)}}}}}'
    if '"' in value:
        v = value.replace("'", "\\'")
        return f"{jsx_name}='{v}'"
    return f'{jsx_name}="{value}"'


class JSXEmitter(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=True)
        self.src = src
        self.out = []
        self.skip_depth = 0
        # Map of section_id -> (start_offset, end_offset) in src, for sub-section replacement
        # We pass this in to know when to emit a placeholder instead of the actual content
        self.replace_targets = {}  # id -> replacement string (e.g., '<TentangSection />')
        # Stack of (tag, start_offset, is_replacement_target_id_or_None)
        self.tag_stack = []
        # When we're inside a section being replaced, track depth to skip everything
        self.skip_section_depth = 0
        self.skip_section_id = None

    def set_replacements(self, mapping):
        """mapping: dict of section_id -> JSX placeholder string to substitute."""
        self.replace_targets = mapping

    def _pos_offset(self):
        line, col = self.getpos()
        if not hasattr(self, '_line_starts'):
            self._line_starts = [0]
            for i, ch in enumerate(self.src):
                if ch == '\n':
                    self._line_starts.append(i + 1)
        return self._line_starts[line - 1] + col

    def handle_starttag(self, tag, attrs):
        tag_lower = tag.lower()
        if tag_lower in ('script', 'style'):
            self.skip_depth += 1
            return
        # Check if this is a <section> with id matching a replacement target
        attrs_d = dict(attrs)
        sid = attrs_d.get('id') if tag_lower == 'section' else None
        if sid and sid in self.replace_targets and self.skip_section_depth == 0:
            # Emit the placeholder, then skip until matching </section>
            self.out.append(self.replace_targets[sid])
            self.skip_section_depth = 1
            self.skip_section_id = sid
            # Track tag stack so we know which </section> closes this
            self.tag_stack.append(('section-replaced', sid))
            return
        if self.skip_section_depth > 0:
            # We're inside a replaced section, just track depth for matching end tag
            if tag_lower == 'section':
                self.skip_section_depth += 1
                self.tag_stack.append(('section-skipped', None))
            return
        parts = ['<' + tag_lower]
        for name, value in attrs:
            if name is None: continue
            parts.append(' ' + attr_to_jsx(name, value))
        if tag_lower in VOID_TAGS:
            parts.append(' />')
        else:
            parts.append('>')
            self.tag_stack.append(('normal', tag_lower))
        self.out.append(''.join(parts))

    def handle_startendtag(self, tag, attrs):
        tag_lower = tag.lower()
        if tag_lower in ('script', 'style'):
            return
        if self.skip_section_depth > 0:
            return
        parts = ['<' + tag_lower]
        for name, value in attrs:
            if name is None: continue
            parts.append(' ' + attr_to_jsx(name, value))
        parts.append(' />')
        self.out.append(''.join(parts))

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower in ('script', 'style'):
            self.skip_depth -= 1
            return
        if tag_lower == 'section':
            if self.skip_section_depth > 0:
                self.skip_section_depth -= 1
                # Pop the matching entry
                if self.tag_stack:
                    self.tag_stack.pop()
                return
        if tag_lower in VOID_TAGS:
            return
        if self.tag_stack:
            self.tag_stack.pop()
        if self.skip_section_depth == 0:
            self.out.append(f'</{tag_lower}>')

    def handle_data(self, data):
        if self.skip_depth > 0 or self.skip_section_depth > 0:
            return
        if not data: return
        if any(c in data for c in '{}<>'):
            v = data.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
            self.out.append('`' + v + '`')
        else:
            self.out.append(data)

    def handle_comment(self, data):
        if self.skip_section_depth > 0: return
        safe = data.replace('*/', '* /')
        self.out.append('{/* ' + safe + ' */}')

    def handle_entityref(self, name):
        if self.skip_depth > 0 or self.skip_section_depth > 0: return
        self.out.append(f'&{name};')

    def handle_charref(self, name):
        if self.skip_depth > 0 or self.skip_section_depth > 0: return
        self.out.append(f'&#{name};')

    def result(self):
        return ''.join(self.out)


def convert_html_to_jsx(html_str, replacements=None):
    p = JSXEmitter(html_str)
    if replacements:
        p.set_replacements(replacements)
    p.feed(html_str)
    return p.result()


def kebab_to_pascal(s):
    parts = s.split('-')
    return ''.join(p[:1].upper() + p[1:] for p in parts)


# --- Load manifest and group sections ---
manifest = json.loads(Path('/home/z/my-project/scripts/_extracted/manifest.json').read_text())

# Build a dict by id
by_id = {m['id']: m for m in manifest if m['id']}

# Group sub-sections by their parent top-level page
# A sub-section's parent is the top-level section that contains it (by offset overlap)
top_sections = [m for m in manifest if m['id'] and m['id'].startswith('p-')]
sub_sections = [m for m in manifest if m['id'] and not m['id'].startswith('p-') and '--' in m['id']]

# Assign each sub-section to its containing top-level
pages = {}  # pid -> {'top': m, 'subs': [...]}
for t in top_sections:
    pages[t['id']] = {'top': t, 'subs': []}

for sub in sub_sections:
    sid = sub['id']
    # Find parent: the smallest top-level section that contains this sub
    parent = None
    for t in top_sections:
        if t['start'] <= sub['start'] and sub['end'] <= t['end']:
            parent = t['id']
            break
    if parent:
        pages[parent]['subs'].append(sub)
    else:
        # Orphan (e.g., berita--agenda, dasbor--utama) - try fuzzy match by prefix
        prefix = sid.split('--')[0]
        candidate = 'p-' + prefix
        if candidate in pages:
            # Append but with note that it's not nested
            pages[candidate]['subs'].append(sub)
        else:
            print(f'WARN: orphan section {sid}')

print(f'\nTotal pages: {len(pages)}')
for pid, info in pages.items():
    print(f'  {pid}: top={info["top"]["length"]} chars, subs={len(info["subs"])}')

# --- Generate output ---
summary = []
for pid, info in pages.items():
    page_name_kebab = pid[2:]
    page_folder = OUT_DIR / page_name_kebab
    page_folder.mkdir(parents=True, exist_ok=True)

    top_html = (SRC_DIR / f'{pid}.html').read_text(encoding='utf-8')

    # Build replacement map for sub-sections
    replacements = {}
    sub_files = []  # list of (component_name, sub_id)
    for sub in info['subs']:
        sid = sub['id']
        last = sid.split('--')[-1]
        comp_name = kebab_to_pascal(last) + 'Section'
        # Avoid duplicate component names within a folder
        if any(c == comp_name for c, _ in sub_files):
            # Use full id pascal'd
            comp_name = kebab_to_pascal(sid.replace('--', '-')) + 'Section'
        sub_files.append((comp_name, sid))
        replacements[sid] = f'<{comp_name} />'

    # Generate sub-section component files
    sub_imports = []
    sub_renders = []
    for comp_name, sid in sub_files:
        sub_html = (SRC_DIR / f'{sid}.html').read_text(encoding='utf-8')
        # When converting a sub-section, it has nested sections inside too? No, sub-sections
        # are the leaf level (no further nesting in this design).
        sub_jsx = convert_html_to_jsx(sub_html)
        sub_file = page_folder / f'{comp_name}.tsx'
        sub_file.write_text(
            f"""// Section: {sid}
// Originally from 'p-{page_name_kebab}' page. Edit this file to change this section.
export function {comp_name}() {{
  return (
    {sub_jsx}
  );
}}
""", encoding='utf-8')
        sub_imports.append(f"import {{ {comp_name} }} from './{comp_name}';")
        sub_renders.append(f'<{comp_name} />')

    # Generate the top-level wrapper (with sub-section placeholders)
    top_jsx = convert_html_to_jsx(top_html, replacements=replacements)
    top_comp_name = 'PageShell'
    top_file = page_folder / f'{top_comp_name}.tsx'
    # Build imports + render list as a header comment
    imports_str = '\n'.join(sub_imports)
    top_file.write_text(
        f"""// Page wrapper: {pid}
// This is the top-level shell for the '{page_name_kebab}' menu page.
// It contains the page header + sub-nav + placeholders for each sub-section.
// Each sub-section is in its own file in this folder — edit them independently.
{imports_str}
export function {top_comp_name}() {{
  return (
    {top_jsx}
  );
}}
""", encoding='utf-8')

    # Generate index.tsx (page entry)
    page_comp_name = kebab_to_pascal(page_name_kebab) + 'Page'
    index_file = page_folder / 'index.tsx'
    index_file.write_text(
        f"""// Page entry: {page_name_kebab}
// Composes the shell + sub-sections. Edit this only to reorder/add/remove sections.
import {{ {top_comp_name} }} from './{top_comp_name}';
{imports_str}

export function {page_comp_name}() {{
  return (
    <{top_comp_name} />
  );
}}

export default {page_comp_name};
""", encoding='utf-8')

    summary.append({
        'page': page_name_kebab,
        'component': page_comp_name,
        'folder': str(page_folder.relative_to('/home/z/my-project')),
        'sections': len(sub_files),
        'files': [f.name for f in page_folder.iterdir()],
    })

# Save summary
Path('/home/z/my-project/scripts/_extracted/pages_summary.json').write_text(
    json.dumps(summary, indent=2), encoding='utf-8')

print(f'\nGenerated {len(summary)} page folders.')
for s in summary:
    print(f"  {s['page']}: {s['sections']} sub-sections, {len(s['files'])} files")
