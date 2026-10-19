# Interactive Behaviors: Sew Darlin' (https://www.sewdarlin.com.au/)

## 1. Announcement Bar
- **Interaction:** Continuous smooth marquee ticker / static ticker displaying: `Spend $80+ for FREE Shipping Australia-Wide! ✦ Spend $80+ for FREE Shipping Australia-Wide!`
- **Color:** Soft powder blue `#B0C2D1` background, slate text `#34444F`.

## 2. Header & Navigation
- **Logo:** Centered circular badge linking to `/`.
- **Search:** Top right pill button `Search 🔍`. Clicking opens search input / overlay with instant search filtering across products.
- **Cart:** Shopping bag icon with live item count badge (e.g. `0` or active count). Clicking opens slide-out Cart Drawer.
- **Nav Links:** Row of category links with subtle underline/opacity hover effects.

## 3. Hero Section
- **Visuals:** Gingham checkered picnic backdrop with a row of tilted polaroids displaying handcrafted accessories (sunflower hair bow, boot bow, drink coasters, Kindle sleeve, patchwork tote, scrunchies).
- **CTA:** Centered headline "Handcrafted Country & Cottage Inspired Accessories", subtitle "SMALL BATCH DESIGNS CREATED IN QLD AUSTRALIA", and pill button "SHOP THE COLLECTION ⟶" that smoothly scrolls or links to the collections.

## 4. Product Carousels ("New Arrivals" & "Fan Favourites")
- **Layout:** Horizontal scrollable/sliding carousel with navigation arrows (`<` and `>`) at left and right edges.
- **Hover States:**
  - On desktop hover over product image: "Quick View" pill fades in over the lower portion of the image.
  - Subtle image scale transition (`scale-105 duration-300`).
- **Quick View Action:** Clicking "Quick View" opens a modal with high-res product photos, full description, price, quantity selector, and "Add to Cart" button.
- **Add to Cart Action:** Adds product to local shopping cart state, triggers slide-out Cart Drawer, updates announcement progress toward free shipping ($80 threshold).

## 5. Shop By Collection Grid
- **Layout:** 8 distinct collection tiles (Kindle & Book Essentials, Boot Bows, Home Goods, Rodeo Collection, Scrunchies, Hair Bows, Bags, Sale).
- **Card Hover:** Subtle zoom on background image, slight elevation shift.
- **Buttons:** Centered pill button below each card: "Shop Kindle & Book Essentials", "Shop Boot Bows", etc.

## 6. Testimonials Section
- **Visual:** Dusty mauve rose background (`#D5B3B3`), 3-column layout featuring large stylized quotation marks `“`, sincere customer reviews, and customer names.

## 7. Newsletter & Social ("Find Us Online")
- **Social Badges:** Direct links to Instagram, Facebook, and TikTok.
- **Form:** First name input, Email input, required consent checkbox, and "Subscribe Now" outlined pill button with immediate feedback on submission.

## 8. Slide-over Cart Drawer
- **Features:**
  - Free shipping progress bar: "Add $X more to unlock FREE shipping across Australia!"
  - List of cart items with quantity adjuster (+/-) and remove button.
  - Subtotal calculation, estimated shipping, and "Proceed to Checkout" button.

## 9. Customer Service Floating Bubble
- **Features:** Floating circular chat button in bottom right corner. Clicking opens a friendly greeting box with store FAQs, shipping timeframes, and instant inquiry messaging.
