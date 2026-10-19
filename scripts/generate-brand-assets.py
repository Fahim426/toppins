import os
import re
import pymupdf
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND_DIR = os.path.join(BASE_DIR, 'images', 'brand')
PDF_PATH = os.path.join(BRAND_DIR, 'toppins logo original.pdf')

def main():
    print(f"Loading {PDF_PATH}...")
    doc = pymupdf.open(PDF_PATH)
    page = doc[0]

    # Logo area coordinates in PDF points (excluding below address writings at y >= 314)
    # Crest + script + bakers are within: x: [143, 736], y: [111, 289]
    crop_rect = pymupdf.Rect(138, 106, 740, 293)
    page.set_cropbox(crop_rect)

    # 1. Generate clean SVG
    print("Generating logo.svg...")
    raw_svg = page.get_svg_image()

    # Remove font_5 defs and uses (address writings: 'Near CSB Bank, Thadakam Township...')
    cleaned_svg = re.sub(r'<path id="font_5_[^"]+"[^>]*/>\s*', '', raw_svg)
    cleaned_svg = re.sub(r'<use[^>]+font_5_[^>]*/>\s*', '', cleaned_svg)
    cleaned_svg = re.sub(r'<clipPath id="clip_4">[\s\S]*?</clipPath>\s*', '', cleaned_svg)

    svg_out = os.path.join(BRAND_DIR, 'logo.svg')
    with open(svg_out, 'w', encoding='utf-8') as f:
        f.write(cleaned_svg)
    print(f"Saved {svg_out} ({len(cleaned_svg)} bytes)")

    # 2. Render high-res master RGBA raster
    print("Rendering high-res master image (300 DPI)...")
    pix = page.get_pixmap(dpi=300, alpha=True)
    master_img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)

    # Get tight bounding box of entire logo
    bbox = master_img.getbbox()
    cropped_logo = master_img.crop(bbox)

    # Add a balanced 16px transparent margin
    pad = 16
    final_logo = Image.new("RGBA", (cropped_logo.width + pad * 2, cropped_logo.height + pad * 2), (0, 0, 0, 0))
    final_logo.paste(cropped_logo, (pad, pad))

    logo_png = os.path.join(BRAND_DIR, 'logo.png')
    final_logo.save(logo_png, "PNG", optimize=True)
    print(f"Saved {logo_png} ({final_logo.size[0]}x{final_logo.size[1]})")

    logo_webp = os.path.join(BRAND_DIR, 'logo.webp')
    final_logo.save(logo_webp, "WEBP", quality=95)
    print(f"Saved {logo_webp}")

    # 3. Extract the Circular Crest Emblem
    # The crest is located in the left section of master_img
    crest_crop = master_img.crop((bbox[0], bbox[1], bbox[0] + int((bbox[3] - bbox[1]) * 1.05), bbox[3]))
    c_bbox = crest_crop.getbbox()
    crest_img = crest_crop.crop(c_bbox)
    
    # Ensure square canvas with slight 5% circular breathing room
    max_dim = max(crest_img.width, crest_img.height)
    square_crest = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    x_off = (max_dim - crest_img.width) // 2
    y_off = (max_dim - crest_img.height) // 2
    square_crest.paste(crest_img, (x_off, y_off))

    # Add 4% padding for app icons so circle doesn't touch outer edge
    icon_pad = int(max_dim * 0.04)
    padded_crest = Image.new("RGBA", (max_dim + icon_pad * 2, max_dim + icon_pad * 2), (0, 0, 0, 0))
    padded_crest.paste(square_crest, (icon_pad, icon_pad))

    # Generate icons
    icon_512 = padded_crest.resize((512, 512), Image.Resampling.LANCZOS)
    icon_512.save(os.path.join(BRAND_DIR, 'icon-512.png'), "PNG", optimize=True)
    print("Saved icon-512.png")

    icon_192 = padded_crest.resize((192, 192), Image.Resampling.LANCZOS)
    icon_192.save(os.path.join(BRAND_DIR, 'icon-192.png'), "PNG", optimize=True)
    print("Saved icon-192.png")

    apple_touch = padded_crest.resize((180, 180), Image.Resampling.LANCZOS)
    apple_touch.save(os.path.join(BASE_DIR, 'apple-touch-icon.png'), "PNG", optimize=True)
    print("Saved apple-touch-icon.png")

    fav_32 = padded_crest.resize((32, 32), Image.Resampling.LANCZOS)
    fav_32.save(os.path.join(BASE_DIR, 'favicon-32.png'), "PNG", optimize=True)
    print("Saved favicon-32.png")

    # Multi-resolution ICO (16, 32, 48)
    ico_img = padded_crest.resize((48, 48), Image.Resampling.LANCZOS)
    ico_path = os.path.join(BASE_DIR, 'favicon.ico')
    ico_img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print("Saved favicon.ico")

    # Clean up any test files
    for tmp in ['test_crop.png', 'test_crest.png', 'test_script.png']:
        tmp_p = os.path.join(BRAND_DIR, tmp)
        if os.path.exists(tmp_p):
            os.remove(tmp_p)

    print("\nAll brand assets successfully generated from 'toppins logo original.pdf'!")

if __name__ == '__main__':
    main()
