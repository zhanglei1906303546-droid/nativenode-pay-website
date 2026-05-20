
(async () => {
  const productsToFind = ["Daily Cleanse", "Red Carpet", "Killer Nails", "Hair Sweet Hair", "Flatter Me", "Gut Instinct"];
  const results = {};

  // Find products
  document.querySelectorAll('h3').forEach(h3 => {
    const text = h3.textContent.trim();
    // Check if it's one of our products or a former name
    const matchedProduct = productsToFind.find(p => text.includes(p)) || 
                          (text.includes("Hair Strong Gummies") && productsToFind.includes("Hair Sweet Hair") ? "Hair Sweet Hair" : null);
    
    if (matchedProduct) {
      // Find the image in the parent or nearby
      const parent = h3.closest('a') || h3.parentElement;
      const img = parent.parentElement.querySelector('img');
      if (img && img.src) {
        results[matchedProduct] = img.src;
      }
    }
  });

  // Find "Skin" category image
  // Usually categories are in a filter sidebar or a separate section
  const skinCategory = Array.from(document.querySelectorAll('a, button, span, label')).find(el => el.textContent.trim() === "Skin");
  if (skinCategory) {
    const parent = skinCategory.parentElement;
    const img = parent.querySelector('img');
    if (img && img.src) {
      results["Skin Category"] = img.src;
    } else {
      // Look for a background image or nearby image
      const nearbyImg = skinCategory.closest('div')?.querySelector('img');
       if (nearbyImg) results["Skin Category"] = nearbyImg.src;
    }
  }

  return results;
})()
