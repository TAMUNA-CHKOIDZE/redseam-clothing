# RedSeam Clothing — E-commerce React App

## Project Overview

RedSeam Clothing is an e-commerce web application built with React and Tailwind CSS designed for customers to browse and purchase clothing items seamlessly.

The app provides a smooth shopping experience with features like user authentication, product browsing with pagination, detailed product views, a persistent cart, and an order checkout system.

### Key Features

- **User Authentication:**

  - Registration and Login using email and password.
  - Validation of inputs including unique username/email verified via backend API.
  - Avatar upload with preview during registration (optional).

- **Product Listing Page:**

  - Paginated product list in a 3x4 grid showing product image, name, and price.
  - Sorting dropdown and price range filtering.
  - Pagination controls with current page indicator and navigation arrows.
  - Clicking a product card navigates to the product details page.

- **Product Details Page:**

  - Displays detailed info: name, multiple images linked to colors, price, sizes, description, brand info (name and logo).
  - Color and image selectors synced (changing color updates image and vice versa).
  - Add to Cart functionality with quantity and size selection.
  - Repeated addition of the same variant increases quantity.

- **Shopping Cart Sidebar:**

  - Displays products added to cart with name, image, price, selected size, and quantity controls.
  - Shows total quantity and price summary.
  - If cart is empty, shows a friendly prompt: "Uh-oh, you've got nothin in your cart just yet!".
  - Button to proceed to the checkout page.

- **Checkout Page:**

  - Displays cart items and an order form requiring customer details (name, surname, email, zip code, address).
  - Email field pre-populated but editable.
  - On successful submission, cart clears and a congratulatory confirmation modal appears.

- **Persistent Cart:**

  - Cart contents persist across page reloads and logouts by saving in localStorage keyed by product ID.

- **Loading Skeletons:**

  - Used when fetching product data for better UX.

- **Responsive Design:**

  - Designed at 1920x1080 resolution, currently non-responsive.

---

## Technologies Used

- React (with Vite)
- Tailwind CSS for styling
- React Router for navigation
- Context API for global state management (Cart and User)
- Custom hooks for API data fetching
- localStorage for cart persistence

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/TAMUNA-CHKOIDZE/redseam-clothing.git
   cd redseam-clothing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

---

## API

The application uses the following backend API to fetch product data, user authentication, and validation:

- **API base URL:** [https://api.redseam.redberryinternship.ge/scalar](https://api.redseam.redberryinternship.ge/scalar)

Make sure the backend API is accessible to fully utilize registration validation, product fetching, and cart syncing features.

---

## Design & Prototypes

The project’s design files and UI prototype are available on Figma:

- [RedSeam Clothing Figma Design](https://www.figma.com/design/mNz6RGauIhHyuMrGFcPBHs/Bootcamp---RedSeam-Clothing?node-id=0-1&p=f&t=IeCfhtEtOxnk75f8-0)

---

## Folder Structure (Simplified)

```
src/
├── api/              # API calls
├── assets/           # Images, icons
├── components/       # Reusable UI components
├── context/          # React Contexts (Cart, User)
├── pages/            # Page components (Login, Register, Products, ProductDetails, Checkout)
├── router/           # React Router configuration
├── styles/           # Tailwind CSS config and styles
└── utils/            # Utility functions and helpers
```

---

## Notes

- Username and Email uniqueness are verified via backend API during registration.
- Avatar upload supports JPG, PNG formats and shows preview before submission.
- Pagination is implemented on the product listing page showing 10 products per page.
- Adding a product variant that already exists in the cart increases its quantity instead of duplicating.
- The cart persists in localStorage, allowing users to return later without losing their selections.
- Currently designed for desktop resolution (1920x1080), no responsive design.
- Tailwind CSS is used for styling components consistently.
- On checkout, the cart clears after successful order placement, with a confirmation modal.

---

## Contact

For questions or feedback, feel free to contact me at:

[chkoidzetamuna1@gmail.com](mailto:chkoidzetamuna1@gmail.com)
