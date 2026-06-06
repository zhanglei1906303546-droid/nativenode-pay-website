import pymupdf
import os

def create_pdf(output_path, img_paths):
    doc = pymupdf.open()
    # A4 page size
    page_width, page_height = 595, 842
    page = doc.new_page(width=page_width, height=page_height)
    
    # Calculate positions
    # Margin 50
    margin = 50
    available_width = page_width - 2 * margin
    
    y_offset = margin
    for img_path in img_paths:
        if not os.path.exists(img_path):
            print(f"Error: {img_path} not found")
            continue
            
        # Get image size to preserve aspect ratio
        img = pymupdf.open(img_path)
        img_width, img_height = img[0].rect.width, img[0].rect.height
        aspect = img_height / img_width
        
        display_width = available_width
        display_height = display_width * aspect
        
        # Place image
        rect = pymupdf.Rect(margin, y_offset, margin + display_width, y_offset + display_height)
        page.insert_image(rect, filename=img_path)
        
        y_offset += display_height + 40 # Space between images
        img.close()

    doc.save(output_path)
    doc.close()

if __name__ == "__main__":
    create_pdf("ID_Card_Merged.pdf", ["id_front.jpg", "id_back.jpg"])
    print("PDF created: ID_Card_Merged.pdf")
