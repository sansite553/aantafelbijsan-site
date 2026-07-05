from pathlib import Path

from PIL import Image


ROOT = Path("/Users/suzannescheerens/Documents/Website aan tafel bij san")


JOBS = [
    {
        "source": Path(
            "/Users/suzannescheerens/Pictures/Photos Library.photoslibrary/resources/derivatives/A/A16589C9-A924-408F-AD9E-FF4A5E6C6ABE_1_105_c.jpeg"
        ),
        "output": ROOT / "aan-tafel-bij-san-takje-tekst.png",
    },
    {
        "source": Path(
            "/Users/suzannescheerens/Pictures/Photos Library.photoslibrary/resources/derivatives/1/1F55679D-11E1-475B-BED5-61C68B14AA4B_1_105_c.jpeg"
        ),
        "output": ROOT / "met-liefde-takje-tekst.png",
    },
]


def alpha_from_pixel(r: int, g: int, b: int) -> int:
    # Keep the original warm stroke color, but remove the pale circle/background.
    darkness = 255 - max(r, g, b)

    if darkness <= 45:
        return 0
    if darkness >= 85:
        return 255

    fade = (darkness - 45) / (85 - 45)
    return max(0, min(255, int(round(fade * 255))))


def process_image(source: Path, output: Path) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            a = alpha_from_pixel(r, g, b)
            pixels[x, y] = (r, g, b, a)

    bbox = image.getbbox()
    if bbox:
        image = image.crop(bbox)

    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output)


for job in JOBS:
    process_image(job["source"], job["output"])
