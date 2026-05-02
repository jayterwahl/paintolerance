"""
Generate Chrome Web Store promotional images.
Run with: python3 store/generate-promo.py

Produces:
  store/promo-tile-440x280.png  — Small promo tile (required by CWS)
  store/promo-tile-920x680.png  — Large promo tile (optional)

Requires: Pillow  (pip install pillow)
"""

import os
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

BG_DARK   = (21, 32, 43)        # #15202b  Twitter dark-mode background
RED       = (233, 69, 96)       # #e94560  accent
GRAY      = (136, 153, 166)     # #8899a6  muted text
LIGHT     = (231, 233, 234)     # #e7e9ea  primary text

FONT_PATH_BOLD    = "/System/Library/Fonts/Helvetica.ttc"
FONT_PATH_REGULAR = "/System/Library/Fonts/Helvetica.ttc"


def load_font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size=size, index=index)
    except Exception:
        return ImageFont.load_default()


def draw_tile(width, height, out_path):
    img = Image.new("RGB", (width, height), color=BG_DARK)
    draw = ImageDraw.Draw(img)

    # Subtle gradient overlay — PIL doesn't do gradients natively, so simulate
    # by blending a radial vignette via a separate RGBA layer.
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for step in range(20):
        alpha = int(30 * (1 - step / 20))
        od.rectangle(
            [step * width // 40, step * height // 40,
             width - step * width // 40, height - step * height // 40],
            outline=(233, 69, 96, alpha),
        )
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    # ── Title ──────────────────────────────────────────────────────────
    title_size = max(24, int(width * 0.085))
    font_title = load_font(FONT_PATH_BOLD, title_size, index=1)  # index 1 = Bold in .ttc
    title = "Pain Tolerance"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(
        ((width - tw) // 2, int(height * 0.32) - th // 2),
        title,
        fill=LIGHT,
        font=font_title,
    )

    # ── Subtitle ───────────────────────────────────────────────────────
    sub_size = max(12, int(width * 0.038))
    font_sub = load_font(FONT_PATH_REGULAR, sub_size, index=0)
    subtitle = "Resilience training for your timeline"
    bbox = draw.textbbox((0, 0), subtitle, font=font_sub)
    sw = bbox[2] - bbox[0]
    draw.text(
        ((width - sw) // 2, int(height * 0.50)),
        subtitle,
        fill=GRAY,
        font=font_sub,
    )

    # ── Accent line ────────────────────────────────────────────────────
    line_w = int(width * 0.30)
    lx0 = (width - line_w) // 2
    ly  = int(height * 0.62)
    draw.line([(lx0, ly), (lx0 + line_w, ly)], fill=RED, width=3)

    # ── Tagline ────────────────────────────────────────────────────────
    tag_size = max(10, int(width * 0.030))
    font_tag = load_font(FONT_PATH_REGULAR, tag_size, index=0)
    tagline = "Master your instincts under pressure"
    bbox = draw.textbbox((0, 0), tagline, font=font_tag)
    tgw = bbox[2] - bbox[0]
    draw.text(
        ((width - tgw) // 2, int(height * 0.72)),
        tagline,
        fill=RED,
        font=font_tag,
    )

    # ── Border ─────────────────────────────────────────────────────────
    draw.rectangle([1, 1, width - 2, height - 2], outline=(*RED, 80), width=2)

    img.save(out_path, "PNG")
    print(f"Generated: {out_path}  ({os.path.getsize(out_path):,} bytes)")


if __name__ == "__main__":
    draw_tile(440, 280, os.path.join(SCRIPT_DIR, "promo-tile-440x280.png"))
    draw_tile(920, 680, os.path.join(SCRIPT_DIR, "promo-tile-920x680.png"))
    print("\nDone. Upload these to the Chrome Web Store developer dashboard.")
    print("Screenshots must be captured manually from the extension running on Twitter/X.")
