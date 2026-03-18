import os
import re
from collections import Counter


ROOT = os.path.dirname(os.path.dirname(__file__))
OUTPUT = os.path.join(ROOT, "app", "tailwind-compat.css")
EXCLUDE_DIRS = {"node_modules", ".next", "dist"}
CLASSNAME_PATTERN = re.compile(
    r'className\s*=\s*(?:"([^"]+)"|\{`([^`]+)`\}|\{\s*"([^"]+)"\s*\})',
    re.S,
)
CUSTOM_PREFIXES = (
    "auth-",
    "section-",
    "loading-",
    "modal-",
    "portal-",
    "matchmaking-",
    "dc-",
    "ds-",
    "ui-",
    "toast-container",
    "theme-wuxia",
    "moonfall-",
    "wuxia-",
    "toggle-",
    "dashboard-",
    "input-field",
    "btn-",
    "spinner-",
    "font-orbitron",
    "guide-milkdown-",
    "card",
    "group",
)
RESPONSIVE_MAP = {
    "sm": "(min-width: 640px)",
    "md": "(min-width: 768px)",
    "lg": "(min-width: 1024px)",
    "xl": "(min-width: 1280px)",
}
STATE_MAP = {
    "hover": ":hover",
    "focus": ":focus",
    "disabled": ":disabled",
}
SPACING_SCALE = {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "18": "4.5rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "64": "16rem",
}
TEXT_SCALE = {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
}
COLOR_MAP = {
    "white": "#ffffff",
    "black": "#000000",
    "gray-100": "rgb(243 244 246)",
    "gray-300": "rgb(209 213 219)",
    "gray-400": "rgb(156 163 175)",
    "gray-500": "rgb(107 114 128)",
    "gray-600": "rgb(75 85 99)",
    "gray-900": "rgb(17 24 39)",
    "red-300": "rgb(252 165 165)",
    "red-700": "rgb(185 28 28)",
    "red-800/50": "rgb(153 27 27 / 0.5)",
    "emerald-100/70": "rgb(209 250 229 / 0.7)",
    "emerald-200": "rgb(167 243 208)",
    "emerald-300": "rgb(110 231 183)",
    "emerald-400/45": "rgb(52 211 153 / 0.45)",
    "emerald-500/10": "rgb(16 185 129 / 0.1)",
    "emerald-500/30": "rgb(16 185 129 / 0.3)",
    "purple-600": "rgb(147 51 234)",
    "red-400": "rgb(248 113 113)",
    "red-600": "rgb(220 38 38)",
    "red-900/20": "rgb(127 29 29 / 0.2)",
}


def iter_tokens() -> Counter:
    counts: Counter[str] = Counter()
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [dirname for dirname in dirnames if dirname not in EXCLUDE_DIRS]
        for filename in filenames:
            if not filename.endswith((".ts", ".tsx", ".js", ".jsx", ".css")):
                continue
            path = os.path.join(dirpath, filename)
            with open(path, "r", encoding="utf-8") as handle:
                text = handle.read()
            for match in CLASSNAME_PATTERN.finditer(text):
                raw = next(group for group in match.groups() if group is not None)
                if "${" in raw:
                    continue
                for token in raw.split():
                    counts[token] += 1
    return counts


def decode_arbitrary(value: str) -> str:
    return value.replace("_", " ")


def split_variants(token: str):
    parts = token.split(":")
    if len(parts) == 1:
        return [], token
    return parts[:-1], parts[-1]


def escape_selector(token: str) -> str:
    chars: list[str] = []
    for char in token:
        if char.isalnum() or char in "-_":
            chars.append(char)
        else:
            chars.append("\\" + char)
    return "".join(chars)


def size_value(part: str):
    if part.startswith("[") and part.endswith("]"):
        return decode_arbitrary(part[1:-1])
    return SPACING_SCALE.get(part)


def color_value(part: str):
    if part in COLOR_MAP:
        return COLOR_MAP[part]
    rgba_hex = re.fullmatch(r"\[(#[0-9A-Fa-f]{3,8})\]/(\d{1,3})", part)
    if rgba_hex:
        hex_value, alpha = rgba_hex.groups()
        alpha_float = max(0, min(int(alpha), 100)) / 100
        if len(hex_value) == 4:
            hex_value = "#" + "".join(char * 2 for char in hex_value[1:])
        channels = [int(hex_value[index : index + 2], 16) for index in (1, 3, 5)]
        return f"rgb({channels[0]} {channels[1]} {channels[2]} / {alpha_float:g})"
    if part.startswith("[") and part.endswith("]"):
        return decode_arbitrary(part[1:-1])
    if re.fullmatch(r"#[0-9A-Fa-f]{3,8}", part):
        return part
    return None


def shadow_value(part: str):
    if part.startswith("[") and part.endswith("]"):
        return decode_arbitrary(part[1:-1])
    return None


def blur_value(part: str):
    if part.startswith("[") and part.endswith("]"):
        return decode_arbitrary(part[1:-1])
    return {"sm": "4px", "xl": "24px"}.get(part)


def parse_base_token(base: str):
    declarations: list[tuple[str, str]] = []
    static_map = {
        "flex": [("display", "flex")],
        "grid": [("display", "grid")],
        "block": [("display", "block")],
        "inline": [("display", "inline")],
        "inline-block": [("display", "inline-block")],
        "inline-flex": [("display", "inline-flex")],
        "hidden": [("display", "none")],
        "absolute": [("position", "absolute")],
        "relative": [("position", "relative")],
        "fixed": [("position", "fixed")],
        "inset-0": [("top", "0"), ("right", "0"), ("bottom", "0"), ("left", "0")],
        "-top-40": [("top", "-10rem")],
        "z-10": [("z-index", "10")],
        "z-0": [("z-index", "0")],
        "z-20": [("z-index", "20")],
        "z-40": [("z-index", "40")],
        "z-50": [("z-index", "50")],
        "w-full": [("width", "100%")],
        "w-auto": [("width", "auto")],
        "h-full": [("height", "100%")],
        "h-px": [("height", "1px")],
        "min-w-0": [("min-width", "0")],
        "min-h-screen": [("min-height", "100vh")],
        "mx-auto": [("margin-left", "auto"), ("margin-right", "auto")],
        "mx-0": [("margin-left", "0"), ("margin-right", "0")],
        "justify-between": [("justify-content", "space-between")],
        "justify-center": [("justify-content", "center")],
        "justify-end": [("justify-content", "flex-end")],
        "items-center": [("align-items", "center")],
        "items-start": [("align-items", "flex-start")],
        "flex-col": [("flex-direction", "column")],
        "flex-row": [("flex-direction", "row")],
        "flex-wrap": [("flex-wrap", "wrap")],
        "flex-1": [("flex", "1 1 0%")],
        "shrink-0": [("flex-shrink", "0")],
        "text-center": [("text-align", "center")],
        "text-left": [("text-align", "left")],
        "text-right": [("text-align", "right")],
        "overflow-hidden": [("overflow", "hidden")],
        "overflow-y-auto": [("overflow-y", "auto")],
        "border": [
            ("border-width", "1px"),
            ("border-style", "solid"),
            ("border-color", "currentColor"),
        ],
        "border-t": [("border-top-width", "1px"), ("border-top-style", "solid")],
        "border-2": [("border-width", "2px"), ("border-style", "solid")],
        "border-b": [("border-bottom-width", "1px"), ("border-bottom-style", "solid")],
        "border-r": [("border-right-width", "1px"), ("border-right-style", "solid")],
        "border-b-0": [("border-bottom-width", "0")],
        "border-dashed": [("border-style", "dashed")],
        "rounded": [("border-radius", "0.25rem")],
        "rounded-lg": [("border-radius", "0.5rem")],
        "rounded-xl": [("border-radius", "0.75rem")],
        "rounded-2xl": [("border-radius", "1rem")],
        "rounded-full": [("border-radius", "9999px")],
        "font-medium": [("font-weight", "500")],
        "font-semibold": [("font-weight", "600")],
        "font-bold": [("font-weight", "700")],
        "italic": [("font-style", "italic")],
        "uppercase": [("text-transform", "uppercase")],
        "leading-6": [("line-height", "1.5rem")],
        "leading-7": [("line-height", "1.75rem")],
        "leading-tight": [("line-height", "1.25")],
        "leading-relaxed": [("line-height", "1.625")],
        "animate-pulse": [
            ("animation", "tw-compat-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite")
        ],
        "animate-spin": [("animation", "tw-compat-spin 1s linear infinite")],
        "transition-colors": [
            (
                "transition-property",
                "color, background-color, border-color, text-decoration-color, fill, stroke",
            )
        ],
        "opacity-30": [("opacity", "0.3")],
        "opacity-50": [("opacity", "0.5")],
        "opacity-60": [("opacity", "0.6")],
        "opacity-70": [("opacity", "0.7")],
        "backdrop-blur-sm": [("backdrop-filter", "blur(4px)")],
        "backdrop-blur-xl": [("backdrop-filter", "blur(24px)")],
        "place-items-center": [("place-items", "center")],
        "line-clamp-2": [
            ("display", "-webkit-box"),
            ("-webkit-line-clamp", "2"),
            ("-webkit-box-orient", "vertical"),
            ("overflow", "hidden"),
        ],
        "-translate-x-1/2": [("transform", "translateX(-50%)")],
        "align-text-bottom": [("vertical-align", "text-bottom")],
        "items-end": [("align-items", "flex-end")],
        "justify-start": [("justify-content", "flex-start")],
        "pointer-events-none": [("pointer-events", "none")],
        "outline-none": [
            ("outline", "2px solid transparent"),
            ("outline-offset", "2px"),
        ],
        "cursor-not-allowed": [("cursor", "not-allowed")],
        "flex-shrink-0": [("flex-shrink", "0")],
        "container": [
            ("width", "100%"),
            ("margin-left", "auto"),
            ("margin-right", "auto"),
        ],
        "col-span-full": [("grid-column", "1 / -1")],
        "col-span-2": [("grid-column", "span 2 / span 2")],
        "min-h-full": [("min-height", "100%")],
        "ml-auto": [("margin-left", "auto")],
        "right-0": [("right", "0")],
        "left-1/2": [("left", "50%")],
        "shadow-xl": [
            (
                "box-shadow",
                "0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.18)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.18))",
            )
        ],
        "shadow-2xl": [
            (
                "box-shadow",
                "0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.28))",
            )
        ],
        "bg-gradient-to-br": [
            (
                "background-image",
                "linear-gradient(to bottom right, var(--tw-gradient-stops))",
            )
        ],
        "transition-all": [("transition-property", "all")],
    }
    if base in static_map:
        return static_map[base]
    if base.startswith("gap-"):
        value = size_value(base[4:])
        return [("gap", value)] if value else []
    if base.startswith("space-y-"):
        value = size_value(base[8:])
        return [("_space-y", value)] if value else []
    if base.startswith(
        (
            "p-",
            "px-",
            "py-",
            "pt-",
            "pb-",
            "pl-",
            "pr-",
            "m-",
            "mt-",
            "mb-",
            "ml-",
            "mr-",
        )
    ):
        prefix, part = base.split("-", 1)
        value = size_value(part)
        if not value:
            return []
        spacing_map = {
            "p": [("padding", value)],
            "px": [("padding-left", value), ("padding-right", value)],
            "py": [("padding-top", value), ("padding-bottom", value)],
            "pt": [("padding-top", value)],
            "pb": [("padding-bottom", value)],
            "pl": [("padding-left", value)],
            "pr": [("padding-right", value)],
            "m": [("margin", value)],
            "mt": [("margin-top", value)],
            "mb": [("margin-bottom", value)],
            "ml": [("margin-left", value)],
            "mr": [("margin-right", value)],
        }
        return spacing_map[prefix]
    if base.startswith("w-"):
        part = base[2:]
        value = size_value(part)
        return [("width", value)] if value else []
    if base.startswith("h-"):
        part = base[2:]
        value = size_value(part)
        return [("height", value)] if value else []
    if base.startswith("max-h-"):
        part = base[6:]
        value = size_value(part)
        return [("max-height", value)] if value else []
    if base.startswith("max-w-"):
        part = base[6:]
        if part == "6xl":
            return [("max-width", "72rem")]
        if part == "7xl":
            return [("max-width", "80rem")]
        if part == "md":
            return [("max-width", "28rem")]
        if part == "none":
            return [("max-width", "none")]
        value = size_value(part)
        return [("max-width", value)] if value else []
    if base.startswith("grid-cols-"):
        part = base[10:]
        if part in {"1", "2", "3", "4"}:
            return [("grid-template-columns", f"repeat({part}, minmax(0, 1fr))")]
        if part.startswith("[") and part.endswith("]"):
            return [("grid-template-columns", decode_arbitrary(part[1:-1]))]
        return []
    if base.startswith("text-"):
        part = base[5:]
        if part in TEXT_SCALE:
            return [("font-size", TEXT_SCALE[part])]
        if part == "6xl":
            return [("font-size", "3.75rem"), ("line-height", "1")]
        color = color_value(part)
        return [("color", color)] if color else []
    if base.startswith("placeholder-"):
        color = color_value(base[12:])
        return [("_placeholder-color", color)] if color else []
    if base.startswith("tracking-"):
        part = base[9:]
        if part.startswith("[") and part.endswith("]"):
            return [("letter-spacing", decode_arbitrary(part[1:-1]))]
        return []
    if base.startswith("leading-"):
        part = base[8:]
        if part.startswith("[") and part.endswith("]"):
            return [("line-height", decode_arbitrary(part[1:-1]))]
        return []
    if base.startswith("bg-"):
        part = base[3:]
        if part.startswith("[") and part.endswith("]"):
            return [("background", decode_arbitrary(part[1:-1]))]
        color = color_value(part)
        if color:
            return [("background-color", color)]
        return []
    if base.startswith("from-"):
        color = color_value(base[5:])
        if color:
            return [
                ("--tw-gradient-from", color),
                (
                    "--tw-gradient-stops",
                    "var(--tw-gradient-from), var(--tw-gradient-to, rgb(255 255 255 / 0))",
                ),
            ]
        return []
    if base.startswith("to-"):
        color = color_value(base[3:])
        return [("--tw-gradient-to", color)] if color else []
    if base.startswith("via-"):
        color = color_value(base[4:])
        if color:
            return [
                (
                    "--tw-gradient-stops",
                    f"var(--tw-gradient-from), {color}, var(--tw-gradient-to, rgb(255 255 255 / 0))",
                )
            ]
        return []
    if base.startswith("border-"):
        part = base[7:]
        color = color_value(part)
        if color:
            return [("border-color", color)]
        if part.startswith("[") and part.endswith("]"):
            return [("border-color", decode_arbitrary(part[1:-1]))]
        return []
    if base.startswith("shadow-"):
        color = color_value(base[7:])
        if color:
            return [("--tw-shadow-color", color)]
        value = shadow_value(base[7:])
        return [("box-shadow", value)] if value else []
    if base.startswith(("left-", "right-", "top-", "bottom-")):
        prop, part = base.split("-", 1)
        mapping = {"0": "0", "1/2": "50%"}
        value = mapping.get(part)
        if not value and part.startswith("[") and part.endswith("]"):
            value = decode_arbitrary(part[1:-1])
        return [(prop, value)] if value else []
    if base.startswith("rounded-") and base[8:].startswith("[") and base.endswith("]"):
        return [("border-radius", decode_arbitrary(base[9:-1]))]
    if base.startswith("backdrop-blur-"):
        value = blur_value(base[14:])
        return [("backdrop-filter", f"blur({value})")] if value else []
    return []


def build_rules():
    counts = iter_tokens()
    custom_tokens = {token for token in counts if token.startswith(CUSTOM_PREFIXES)}
    rules: list[str] = []
    unsupported: list[str] = []

    for token in sorted(counts):
        if token in custom_tokens:
            continue
        variants, base = split_variants(token)
        medias: list[str] = []
        pseudo = ""
        selector_override = None
        valid = True
        for variant in variants:
            if variant in RESPONSIVE_MAP:
                medias.append(RESPONSIVE_MAP[variant])
            elif variant in STATE_MAP:
                pseudo += STATE_MAP[variant]
            elif variant == "group-hover":
                selector_override = ".group:hover ." + escape_selector(token)
            else:
                valid = False
                break
        if not valid:
            unsupported.append(token)
            continue
        declarations = parse_base_token(base)
        if not declarations:
            unsupported.append(token)
            continue

        selector = selector_override or ("." + escape_selector(token))
        body: list[str] = []
        sibling_spacing = None
        has_placeholder = False
        for prop, value in declarations:
            if prop == "_space-y":
                sibling_spacing = value
            elif prop == "_placeholder-color":
                has_placeholder = True
                body.append(f"  --tw-placeholder-color: {value};")
            else:
                body.append(f"  {prop}: {value};")
        rule = selector + pseudo + " {\n" + "\n".join(body) + "\n}"
        if sibling_spacing:
            rule += (
                "\n"
                + selector
                + pseudo
                + " > :not([hidden]) ~ :not([hidden]) {\n  margin-top: "
                + sibling_spacing
                + ";\n}"
            )
        if has_placeholder:
            rule += (
                "\n"
                + selector
                + pseudo
                + "::placeholder {\n  color: var(--tw-placeholder-color);\n}"
            )
        for media in reversed(medias):
            rule = "@media " + media + " {\n" + rule.replace("\n", "\n  ") + "\n}"
        rules.append(rule)

    return rules, unsupported


def main():
    rules, unsupported = build_rules()
    header = """/* Auto-generated Tailwind compatibility layer for Tailwind removal. */
@keyframes tw-compat-spin {
  to { transform: rotate(360deg); }
}

@keyframes tw-compat-pulse {
  50% { opacity: 0.5; }
}
"""
    with open(OUTPUT, "w", encoding="utf-8") as handle:
        handle.write(header + "\n\n".join(rules) + "\n")

    print(f"Generated {OUTPUT}")
    print(f"Rules: {len(rules)}")
    print(f"Unsupported tokens: {len(unsupported)}")
    if unsupported:
        print("Unsupported sample:")
        for token in unsupported[:80]:
            print(token)


if __name__ == "__main__":
    main()
