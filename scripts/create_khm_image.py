from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

public_dir = Path(r'D:\al_mawa\AlMawaSite\Al-Mawa-portfolio-main3.0\public')
public_dir.mkdir(parents=True, exist_ok=True)
path = public_dir / 'KHM.png'
img = Image.new('RGBA', (512, 512), (255, 255, 255, 0))
d = ImageDraw.Draw(img)
for i in range(256):
    c = int(230 - i * 0.2)
    d.ellipse([i, i, 511 - i, 511 - i], fill=(c, c, 255, 255))
margin = 80
d.ellipse([margin, margin, 511 - margin, 511 - margin], fill=(255, 255, 255, 255))
try:
    font = ImageFont.truetype('arial.ttf', 120)
except Exception:
    font = ImageFont.load_default()
text = 'KHM'
# Use textbbox for Pillow compatibility
bbox = d.textbbox((0, 0), text, font=font)
w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text(((512 - w) / 2, (512 - h) / 2), text, fill=(8, 74, 144, 255), font=font)
img.save(path)
print('created', path)
