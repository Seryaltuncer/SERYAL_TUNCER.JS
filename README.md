# Product Carousel Script

This script creates a horizontally scrollable **"You May Like"** product carousel on the homepage of an e-commerce site. It’s written in pure **vanilla JavaScript**, no libraries required.

## Features
- Runs automatically on the homepage (`window.location.pathname === "/"`).
- Uses `localStorage` to store and retrieve product and favorite data.
- Each product card includes:
  - Image
  - Name
  - Star rating
  - Price and discount info
  - “Add to Cart” button
  - Heart icon to toggle favorites
- Left/right arrows for scrolling

##  Required Data Format

The carousel needs data stored in `localStorage.carouselProducts`, like this:

```js
localStorage.setItem("carouselProducts", JSON.stringify([
  {
    id: 1,
    name: "Product Name",
    price: 89.90,
    original_price: 109.90,
    discount: 18,
    reviewCount: 12,
    img: "https://..."
  }
]));
