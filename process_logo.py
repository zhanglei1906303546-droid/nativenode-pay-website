from PIL import Image, ImageOps

def process_logo(input_path, output_path):
    # Open image
    img = Image.open(input_path).convert("RGBA")
    
    # Create white background to replace transparency if any
    white_bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    img = Image.alpha_composite(white_bg, img).convert("L")
    
    # Thresholding to get pure black and white (0 or 255)
    # The logo is dark blue and green, so standard threshold should work
    img = img.point(lambda x: 0 if x < 200 else 255, '1')
    
    # Convert back to RGB for 24-bit JPG requirement
    img = img.convert("RGB")
    
    # Resize to 1500x1500px keeping aspect ratio (padding with white)
    img.thumbnail((1500, 1500), Image.Resampling.LANCZOS)
    
    new_img = Image.new("RGB", (1500, 1500), (255, 255, 255))
    offset = ((1500 - img.width) // 2, (1500 - img.height) // 2)
    new_img.paste(img, offset)
    
    # Save as JPG with 300 DPI
    new_img.save(output_path, "JPEG", quality=95, dpi=(300, 300))
    print(f"Processed image saved to {output_path}")

if __name__ == "__main__":
    process_logo("original_logo.png", "Yvora_Trademark_Logo.jpg")
