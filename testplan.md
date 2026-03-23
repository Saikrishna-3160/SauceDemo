# SauceDemo Application - Comprehensive Manual Test Plan

## Application Overview

The SauceDemo application (https://www.saucedemo.com/) is a practice e-commerce test environment that simulates a real-world shopping experience. It includes user authentication, product browsing with sorting capabilities, shopping cart management, and a multi-step checkout process. This test plan covers comprehensive manual testing across all major features including login/logout, product browsing, cart operations, and checkout flows with both positive and negative test scenarios.

## Test Scenarios

### 1. Login and Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-001: Valid Login with Standard User

**File:** `tests/login/valid-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
    - expect: Username field is visible
    - expect: Password field is visible
    - expect: Login button is visible
  2. Enter 'standard_user' in the Username field
    - expect: Username is entered successfully
  3. Enter 'secret_sauce' in the Password field
    - expect: Password is entered successfully
  4. Click the Login button
    - expect: User is redirected to the products page (inventory.html)
    - expect: Products are displayed
    - expect: User is successfully authenticated

#### 1.2. TC-002: Login with Empty Username

**File:** `tests/login/empty-username.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Leave the Username field empty
    - expect: Username field remains empty
  3. Enter 'secret_sauce' in the Password field
    - expect: Password is entered successfully
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Username is required'
    - expect: User remains on the login page
    - expect: Error message can be closed with the close button

#### 1.3. TC-003: Login with Empty Password

**File:** `tests/login/empty-password.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'standard_user' in the Username field
    - expect: Username is entered successfully
  3. Leave the Password field empty
    - expect: Password field remains empty
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Password is required'
    - expect: User remains on the login page

#### 1.4. TC-004: Login with Invalid Credentials

**File:** `tests/login/invalid-credentials.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'invalid_user' in the Username field
    - expect: Username is entered successfully
  3. Enter 'invalid_password' in the Password field
    - expect: Password is entered successfully
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Username and password do not match any user in this service'
    - expect: User remains on the login page

#### 1.5. TC-005: Login with Locked Out User

**File:** `tests/login/locked-out-user.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Enter 'locked_out_user' in the Username field
    - expect: Username is entered successfully
  3. Enter 'secret_sauce' in the Password field
    - expect: Password is entered successfully
  4. Click the Login button
    - expect: Error message is displayed: 'Epic sadface: Sorry, this user has been locked out.'
    - expect: User remains on the login page

#### 1.6. TC-006: Logout Functionality

**File:** `tests/login/logout.spec.ts`

**Steps:**
  1. Log in as standard_user with credentials (standard_user/secret_sauce)
    - expect: User is redirected to the products page
  2. Click the 'Open Menu' button in the top left corner
    - expect: Menu is displayed with options: All Items, About, Logout, Reset App State
  3. Click the 'Logout' link from the menu
    - expect: User is redirected to the login page
    - expect: Session is terminated
    - expect: User cannot access the products page without logging in again

#### 1.7. TC-007: Login Page Elements Visibility

**File:** `tests/login/page-elements.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Swag Labs logo is visible
    - expect: Username field with placeholder text is visible
    - expect: Password field with placeholder text is visible
    - expect: Login button is visible
    - expect: Accepted usernames list is displayed (standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user)
    - expect: Password hint 'secret_sauce' is displayed

#### 1.8. TC-008: Multiple Failed Login Attempts

**File:** `tests/login/multiple-failures.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/
    - expect: Login page is displayed
  2. Attempt to login with incorrect credentials (invalid_user/wrong_password)
    - expect: Error message is displayed
  3. Close the error message
    - expect: Error is dismissed
  4. Attempt to login again with the same incorrect credentials
    - expect: Error message is displayed again
    - expect: No account lockout occurs for invalid credentials
  5. Attempt to login with correct credentials (standard_user/secret_sauce)
    - expect: Login is successful
    - expect: User is redirected to the products page

### 2. Products Page and Filtering

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC-101: View All Products on Inventory Page

**File:** `tests/products/view-all-products.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Observe all products displayed on the page
    - expect: All 6 products are visible: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)
    - expect: Each product displays an image, name, description, and price
    - expect: Each product has an 'Add to cart' button

#### 2.2. TC-102: Sort Products by Name (A to Z)

**File:** `tests/products/sort-name-atp.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed with default sorting
  2. Click on the sorting dropdown
    - expect: Dropdown displays sorting options: Name (A to Z), Name (Z to A), Price (low to high), Price (high to low)
  3. Select 'Name (A to Z)' from the dropdown
    - expect: Products are sorted alphabetically from A to Z: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

#### 2.3. TC-103: Sort Products by Name (Z to A)

**File:** `tests/products/sort-name-zta.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click on the sorting dropdown
    - expect: Dropdown displays sorting options
  3. Select 'Name (Z to A)' from the dropdown
    - expect: Products are sorted in reverse alphabetical order: Test.allTheThings() T-Shirt (Red), Sauce Labs Onesie, Sauce Labs Fleece Jacket, Sauce Labs Bolt T-Shirt, Sauce Labs Bike Light, Sauce Labs Backpack

#### 2.4. TC-104: Sort Products by Price (Low to High)

**File:** `tests/products/sort-price-lth.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click on the sorting dropdown
    - expect: Dropdown displays sorting options
  3. Select 'Price (low to high)' from the dropdown
    - expect: Products are sorted by price from lowest to highest: Sauce Labs Onesie ($7.99), Sauce Labs Bike Light ($9.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt ($15.99), Sauce Labs Backpack ($29.99), Sauce Labs Fleece Jacket ($49.99)

#### 2.5. TC-105: Sort Products by Price (High to Low)

**File:** `tests/products/sort-price-htl.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click on the sorting dropdown
    - expect: Dropdown displays sorting options
  3. Select 'Price (high to low)' from the dropdown
    - expect: Products are sorted by price from highest to lowest: Sauce Labs Fleece Jacket ($49.99), Sauce Labs Backpack ($29.99), Sauce Labs Bolt T-Shirt ($15.99), Test.allTheThings() T-Shirt ($15.99), Sauce Labs Bike Light ($9.99), Sauce Labs Onesie ($7.99)

#### 2.6. TC-106: View Product Details by Clicking Product Name

**File:** `tests/products/view-product-details.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click on a product name (e.g., 'Sauce Labs Backpack')
    - expect: Product details page is displayed
    - expect: Product name, description, price, and large product image are visible
    - expect: Product-specific information is correct

#### 2.7. TC-107: Navigate Back from Product Details

**File:** `tests/products/navigate-back-from-details.spec.ts`

**Steps:**
  1. Log in as standard_user and navigate to a product details page
    - expect: Product details page is displayed
  2. Click the browser back button or navigate back
    - expect: User is returned to the products inventory page
    - expect: The page and sorting settings are maintained

#### 2.8. TC-108: Add Multiple Products to Cart

**File:** `tests/products/add-multiple-products.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
    - expect: Cart badge shows '0'
  2. Click 'Add to cart' for Sauce Labs Backpack
    - expect: Cart badge updates to '1'
    - expect: Product button changes from 'Add to cart' to 'Remove'
  3. Click 'Add to cart' for Sauce Labs Bike Light
    - expect: Cart badge updates to '2'
  4. Click 'Add to cart' for Sauce Labs Bolt T-Shirt
    - expect: Cart badge updates to '3'
    - expect: All three items are in the cart

### 3. Shopping Cart Operations

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC-201: View Empty Cart

**File:** `tests/cart/view-empty-cart.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click on the cart icon/badge
    - expect: Cart page is displayed
    - expect: Cart is empty with no items listed
    - expect: Checkout button is visible but may be disabled or clickable

#### 3.2. TC-202: Add Single Product to Cart and View

**File:** `tests/cart/add-single-product.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Click 'Add to cart' for any product (e.g., Sauce Labs Backpack - $29.99)
    - expect: Product is added to cart
    - expect: Cart badge shows '1'
  3. Click on the cart icon to view cart contents
    - expect: Cart page displays the added product
    - expect: Product name, description, price ($29.99), and quantity (1) are shown
    - expect: Product has a 'Remove' button

#### 3.3. TC-203: Add Multiple Products to Cart and View

**File:** `tests/cart/add-multiple-to-cart.spec.ts`

**Steps:**
  1. Log in as standard_user
    - expect: Products inventory page is displayed
  2. Add 3 different products to cart (Backpack, Bike Light, T-Shirt)
    - expect: Cart badge shows '3'
  3. Navigate to cart page
    - expect: All 3 products are listed in the cart
    - expect: Each product shows: quantity (1), name, description, price
    - expect: All products have 'Remove' buttons

#### 3.4. TC-204: Remove Product from Cart

**File:** `tests/cart/remove-product.spec.ts`

**Steps:**
  1. Log in as standard_user and add a product to cart
    - expect: Cart badge shows '1'
  2. Navigate to cart page
    - expect: Product is displayed in cart
  3. Click the 'Remove' button for the product
    - expect: Product is removed from cart
    - expect: Cart becomes empty
    - expect: Cart badge updates to show '0'

#### 3.5. TC-205: Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Log in as standard_user, add products to cart, and navigate to cart page
    - expect: Cart page is displayed with products
  2. Click the 'Continue Shopping' button
    - expect: User is redirected back to the products inventory page
    - expect: Products are still visible
    - expect: Cart items are preserved (cart badge still shows the correct count)

#### 3.6. TC-206: View Cart Total with Multiple Products

**File:** `tests/cart/view-cart-total.spec.ts`

**Steps:**
  1. Log in as standard_user and add multiple products to cart
    - expect: Products are added successfully
  2. Navigate to cart page and verify item totals
    - expect: All added products are displayed
    - expect: Each product shows correct price
    - expect: Quantity for each product is displayed

#### 3.7. TC-207: Remove All Products from Cart

**File:** `tests/cart/remove-all-products.spec.ts`

**Steps:**
  1. Log in as standard_user and add multiple products to cart
    - expect: Cart badge shows the number of products
  2. Navigate to cart page
    - expect: All products are displayed
  3. Remove each product one by one by clicking 'Remove' button
    - expect: Each product is removed when its Remove button is clicked
    - expect: Cart becomes empty after removing all items
    - expect: Checkout button may be disabled for empty cart

#### 3.8. TC-208: Cart Persistence After Navigation

**File:** `tests/cart/cart-persistence.spec.ts`

**Steps:**
  1. Log in as standard_user and add 2 products to cart
    - expect: Cart badge shows '2'
  2. Navigate away from cart (continue shopping, view products)
    - expect: Products page is displayed
    - expect: Cart badge still shows '2'
  3. Click on cart again
    - expect: Car still contains the 2 products previously added
    - expect: No items have been lost

### 4. Checkout: Your Information

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC-301: Proceed to Checkout from Cart with Items

**File:** `tests/checkout/proceed-to-checkout.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to cart page
    - expect: Cart page displays the product
  2. Click the 'Checkout' button
    - expect: User is redirected to Checkout: Your Information page
    - expect: Page title shows 'Checkout: Your Information'
    - expect: Three input fields are visible: First Name, Last Name, Zip/Postal Code

#### 4.2. TC-302: Complete Checkout Information with Valid Data

**File:** `tests/checkout/valid-info.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Enter 'John' in the First Name field
    - expect: First name is entered successfully
  3. Enter 'Doe' in the Last Name field
    - expect: Last name is entered successfully
  4. Enter '12345' in the Zip/Postal Code field
    - expect: Zip code is entered successfully
  5. Click the 'Continue' button
    - expect: User is redirected to Checkout: Overview page
    - expect: All entered information is passed to the next step

#### 4.3. TC-303: Checkout with Missing First Name

**File:** `tests/checkout/missing-first-name.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Leave the First Name field empty
    - expect: First name field remains empty
  3. Enter 'Doe' in the Last Name field
    - expect: Last name is entered successfully
  4. Enter '12345' in the Zip/Postal Code field
    - expect: Zip code is entered successfully
  5. Click the 'Continue' button
    - expect: Error message is displayed: 'Error: First Name is required'
    - expect: User remains on the Checkout: Your Information page

#### 4.4. TC-304: Checkout with Missing Last Name

**File:** `tests/checkout/missing-last-name.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Enter 'John' in the First Name field
    - expect: First name is entered successfully
  3. Leave the Last Name field empty
    - expect: Last name field remains empty
  4. Enter '12345' in the Zip/Postal Code field
    - expect: Zip code is entered successfully
  5. Click the 'Continue' button
    - expect: Error message is displayed: 'Error: Last Name is required'
    - expect: User remains on the Checkout: Your Information page

#### 4.5. TC-305: Checkout with Missing Zip/Postal Code

**File:** `tests/checkout/missing-zip.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Enter 'John' in the First Name field
    - expect: First name is entered successfully
  3. Enter 'Doe' in the Last Name field
    - expect: Last name is entered successfully
  4. Leave the Zip/Postal Code field empty
    - expect: Zip code field remains empty
  5. Click the 'Continue' button
    - expect: Error message is displayed: 'Error: Postal Code is required'
    - expect: User remains on the Checkout: Your Information page

#### 4.6. TC-306: Checkout with All Fields Missing

**File:** `tests/checkout/all-fields-missing.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Leave all fields empty
    - expect: All fields are empty
  3. Click the 'Continue' button
    - expect: Error message is displayed for the first required field: 'Error: First Name is required'
    - expect: User remains on the Checkout: Your Information page

#### 4.7. TC-307: Cancel Checkout

**File:** `tests/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Click the 'Cancel' button
    - expect: User is redirected back to the products/inventory page
    - expect: Cart items are preserved

#### 4.8. TC-308: Checkout with Special Characters in Name

**File:** `tests/checkout/special-characters.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Enter 'John@#$%' in the First Name field
    - expect: Special characters are accepted in the field
  3. Enter 'O'Brien' in the Last Name field (with apostrophe)
    - expect: Apostrophe is accepted in the field
  4. Enter '12345' in the Zip/Postal Code field
    - expect: Zip code is entered successfully
  5. Click the 'Continue' button
    - expect: Form is accepted and user proceeds to Overview page (or error is shown if special chars not allowed)

#### 4.9. TC-309: Checkout with Long Names and Zip Code

**File:** `tests/checkout/long-input.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and navigate to checkout page
    - expect: Checkout: Your Information page is displayed
  2. Enter a very long first name (e.g., 'JohnJohnJohnJohnJohnJohn...' - 50+ characters)
    - expect: Field accepts the long input (no character limit enforced or limited appropriately)
  3. Enter a very long last name
    - expect: Field accepts the long input
  4. Enter a very long zip code (e.g., '123456789')
    - expect: Field accepts the input
  5. Click the 'Continue' button
    - expect: Form is accepted or error is shown
    - expect: User proceeds to Overview page if accepted

### 5. Checkout: Overview Page

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC-401: View Order Overview After Information Entry

**File:** `tests/checkout/view-overview.spec.ts`

**Steps:**
  1. Log in as standard_user, add a product to cart, and complete checkout information (First Name: John, Last Name: Doe, Zip: 12345)
    - expect: Checkout: Overview page is displayed
  2. Verify the page displays order summary
    - expect: Page title shows 'Checkout: Overview'
    - expect: Product(s) added to cart are displayed with quantity and price
    - expect: Payment Information section shows: 'SauceCard #31337'
    - expect: Shipping Information section shows: 'Free Pony Express Delivery'
    - expect: Price breakdown is visible

#### 5.2. TC-402: Verify Product Details in Overview

**File:** `tests/checkout/verify-product-details.spec.ts`

**Steps:**
  1. Add a single product (Sauce Labs Backpack - $29.99) to cart and proceed to checkout overview page
    - expect: Overview page is displayed
  2. Verify product information displayed
    - expect: Product name: 'Sauce Labs Backpack'
    - expect: Quantity: 1
    - expect: Price: $29.99
    - expect: Product description is visible
    - expect: Correct product image is shown

#### 5.3. TC-403: Verify Price Breakdown in Overview

**File:** `tests/checkout/verify-price-breakdown.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack ($29.99) to cart and proceed to checkout overview page
    - expect: Overview page is displayed
  2. Verify price section displays correct totals
    - expect: Item total: $29.99
    - expect: Tax: $2.40
    - expect: Total: $32.39
    - expect: All values are correctly calculated

#### 5.4. TC-404: Verify Multiple Products in Overview

**File:** `tests/checkout/verify-multiple-products.spec.ts`

**Steps:**
  1. Add 3 products to cart (Backpack $29.99, Bike Light $9.99, T-Shirt $15.99) and proceed to checkout overview
    - expect: Overview page is displayed
  2. Verify all products are displayed in the overview
    - expect: All 3 products are listed
    - expect: Each shows correct quantity (1)
    - expect: Each shows correct price
    - expect: Item total = $55.97 (29.99 + 9.99 + 15.99)
    - expect: Tax is calculated correctly
    - expect: Total is correct

#### 5.5. TC-405: Cancel from Overview Page

**File:** `tests/checkout/cancel-from-overview.spec.ts`

**Steps:**
  1. Add a product to cart and proceed to checkout overview page
    - expect: Overview page is displayed
  2. Click the 'Cancel' button
    - expect: User is redirected to the products inventory page
    - expect: Cart items are preserved

#### 5.6. TC-406: Complete Order from Overview

**File:** `tests/checkout/complete-order.spec.ts`

**Steps:**
  1. Add a product to cart and proceed through checkout with valid information
    - expect: Overview page is displayed with order summary
  2. Click the 'Finish' button
    - expect: Order is processed successfully
    - expect: User is redirected to Checkout: Complete page
    - expect: Order confirmation is shown

#### 5.7. TC-407: Verify Payment and Shipping Information

**File:** `tests/checkout/verify-payment-shipping.spec.ts`

**Steps:**
  1. Add a product to cart and proceed to checkout overview page
    - expect: Overview page is displayed
  2. Verify payment information section
    - expect: Payment Information section is visible
    - expect: Shows 'SauceCard #31337' as the payment method
  3. Verify shipping information section
    - expect: Shipping Information section is visible
    - expect: Shows 'Free Pony Express Delivery' as the shipping method

#### 5.8. TC-408: Overview Page Layout and Elements

**File:** `tests/checkout/overview-layout.spec.ts`

**Steps:**
  1. Add a product to cart and proceed to checkout overview page
    - expect: Overview page is displayed
  2. Verify all required sections and buttons are present
    - expect: Product summary table with QTY and Description columns
    - expect: Product details section
    - expect: Payment Information section
    - expect: Shipping Information section
    - expect: Price Total section with Item total, Tax, Total
    - expect: Cancel button
    - expect: Finish button
    - expect: Swag Labs header with cart link
