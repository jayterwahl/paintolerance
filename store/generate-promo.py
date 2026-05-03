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

BG_DARK = (21, 32, 43)        # Twitter dim background
RED = (233, 69, 96)           # accent
GRAY = (136, 153, 166)        # muted text
LIGHT = (231, 233, 234)       # primary text
FACE_YELLOW = (255, 204, 51)  # classic emoji yellow
FACE_OUTLINE = (28, 18, 6)    # near-black outline
EYE_BAG = (180, 130, 60)      # bruised under-eye
SWEAT_BLUE = (110, 175, 230)  # cartoon sweat drop

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"


def load_font(size, bold=False):
    try:
        return ImageFont.truetype(FONT_PATH, size=size, index=1 if bold else 0)
    except Exception:
        return ImageFont.load_default()


def draw_cracked_smiley(canvas, cx, cy, radius):
    """Draw a simplistic cracked-out, tired smiling face centered at (cx, cy)."""
    d = ImageDraw.Draw(canvas)
    stroke = max(2, radius // 18)

    # Face circle
    d.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        fill=FACE_YELLOW, outline=FACE_OUTLINE, width=stroke,
    )

    # Eyes — drooping half-circles (tired). Two filled arcs that look like
    # heavy lower eyelids over wide pupils.
    eye_offset_x = int(radius * 0.42)
    eye_offset_y = int(radius * 0.20)
    eye_w = int(radius * 0.32)
    eye_h = int(radius * 0.42)

    for sign in (-1, 1):
        ex, ey = cx + sign * eye_offset_x, cy - eye_offset_y
        # Eye whites — wide, bloodshot circles
        d.ellipse(
            [ex - eye_w, ey - eye_h, ex + eye_w, ey + eye_h],
            fill=LIGHT, outline=FACE_OUTLINE, width=stroke,
        )
        # Pupil — small offset dot, looking slightly different directions (cross-eyed-ish)
        pupil_r = max(2, radius // 14)
        pupil_offset_x = -sign * pupil_r // 2
        d.ellipse(
            [ex - pupil_r + pupil_offset_x, ey - pupil_r,
             ex + pupil_r + pupil_offset_x, ey + pupil_r],
            fill=FACE_OUTLINE,
        )
        # Heavy upper eyelid drooping over the eye (drowsy look)
        lid_h = int(eye_h * 1.0)
        d.chord(
            [ex - eye_w, ey - eye_h, ex + eye_w, ey - eye_h + lid_h * 2],
            start=180, end=360,
            fill=FACE_YELLOW, outline=FACE_OUTLINE, width=stroke,
        )
        # Eye bag — semicircle below the eye
        bag_h = int(radius * 0.16)
        d.arc(
            [ex - eye_w, ey + int(eye_h * 0.4),
             ex + eye_w, ey + int(eye_h * 0.4) + bag_h * 2],
            start=180, end=360, fill=EYE_BAG, width=stroke,
        )

    # Mouth — small uneven smile (tired but smiling)
    mouth_w = int(radius * 0.65)
    mouth_y = cy + int(radius * 0.42)
    mouth_h = int(radius * 0.28)
    d.arc(
        [cx - mouth_w, mouth_y - mouth_h // 2,
         cx + mouth_w, mouth_y + mouth_h * 2],
        start=0, end=180, fill=FACE_OUTLINE, width=stroke,
    )

    # Sweat drop — top right of head, suggests strain
    drop_x = cx + int(radius * 0.78)
    drop_y = cy - int(radius * 0.55)
    drop_r = max(3, radius // 10)
    # Teardrop: triangle on top of a circle
    d.polygon(
        [
            (drop_x, drop_y - drop_r * 2),
            (drop_x - drop_r, drop_y),
            (drop_x + drop_r, drop_y),
        ],
        fill=SWEAT_BLUE, outline=FACE_OUTLINE,
    )
    d.ellipse(
        [drop_x - drop_r, drop_y - drop_r,
         drop_x + drop_r, drop_y + drop_r],
        fill=SWEAT_BLUE, outline=FACE_OUTLINE, width=max(1, stroke // 2),
    )

    # A couple of stress / twitch lines off the temples
    line_len = int(radius * 0.22)
    for sign in (-1, 1):
        x0 = cx + sign * int(radius * 1.05)
        y0 = cy - int(radius * 0.15)
        d.line(
            [(x0, y0), (x0 + sign * line_len, y0 - line_len // 2)],
            fill=FACE_OUTLINE, width=max(1, stroke // 2),
        )
        d.line(
            [(x0, y0 + line_len // 2), (x0 + sign * line_len, y0 + line_len)],
            fill=FACE_OUTLINE, width=max(1, stroke // 2),
        )


def draw_tile(width, height, out_path):
    img = Image.new("RGBA", (width, height), color=(*BG_DARK, 255))

    # Subtle red vignette so the tile reads as "stress"
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for step in range(20):
        alpha = int(30 * (1 - step / 20))
        od.rectangle(
            [step * width // 40, step * height // 40,
             width - step * width // 40, height - step * height // 40],
            outline=(*RED, alpha),
        )
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)

    # Smiley anchored on the left third (slightly smaller to leave more room
    # for the right-side text block).
    smiley_radius = int(min(width, height) * 0.28)
    smiley_cx = int(width * 0.22)
    smiley_cy = int(height * 0.50)
    draw_cracked_smiley(img, smiley_cx, smiley_cy, smiley_radius)

    # Right-side text column. Compute available width and pick a title size
    # that actually fits — Helvetica Bold "Pain Tolerance" otherwise clips.
    text_x = int(width * 0.43)
    text_right_pad = int(width * 0.04)
    available_w = width - text_x - text_right_pad

    title = "Pain Tolerance"
    title_size = max(18, int(width * 0.075))
    font_title = load_font(title_size, bold=True)
    while title_size > 14:
        bbox = draw.textbbox((0, 0), title, font=font_title)
        if bbox[2] - bbox[0] <= available_w:
            break
        title_size -= 1
        font_title = load_font(title_size, bold=True)
    bbox = draw.textbbox((0, 0), title, font=font_title)
    th = bbox[3] - bbox[1]
    title_y = int(height * 0.32) - th // 2
    draw.text((text_x, title_y), title, fill=LIGHT, font=font_title)

    # Subtitle
    sub_size = max(11, int(width * 0.030))
    font_sub = load_font(sub_size)
    subtitle = "Resilience training for your timeline"
    draw.text((text_x, title_y + th + 12), subtitle, fill=GRAY, font=font_sub)

    # Accent line under subtitle
    line_y = title_y + th + 12 + sub_size + 14
    draw.line(
        [(text_x, line_y), (text_x + int(width * 0.24), line_y)],
        fill=RED, width=max(2, width // 220),
    )

    # Tagline
    tag_size = max(10, int(width * 0.024))
    font_tag = load_font(tag_size)
    tagline = "Master your instincts under pressure"
    draw.text((text_x, line_y + 14), tagline, fill=RED, font=font_tag)

    # Border
    ImageDraw.Draw(img).rectangle(
        [1, 1, width - 2, height - 2], outline=(*RED, 80), width=2,
    )

    img.convert("RGB").save(out_path, "PNG")
    print(f"Generated: {out_path}  ({os.path.getsize(out_path):,} bytes)")


if __name__ == "__main__":
    draw_tile(440, 280, os.path.join(SCRIPT_DIR, "promo-tile-440x280.png"))
    draw_tile(920, 680, os.path.join(SCRIPT_DIR, "promo-tile-920x680.png"))
    print("\nDone. Upload these to the Chrome Web Store developer dashboard.")
    print("Screenshots must be captured manually from the extension running on Twitter/X.")
