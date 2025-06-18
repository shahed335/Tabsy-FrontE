# Front-End Document: Pharmacy App

## Description

My website acts as an online pharmacy where the users can shop for medications, check drug interactions, and view their profile. Its major features are the following: Users can browse a wide variety of medications, which include generic and brand names, prices, and short descriptions for what they are used for. Each product involved detailed information like the generic name, brand names, strength, pack size, price, and description of how the medication works. (Drug Interaction Checker) This feature allows users to test possible interactions between two drugs, by entering the names of the drugs to run a check. Users can add medications to the cart, watch the total price, and check out. Users can view and manage their profile, including details of their personal information and previous medications and the option to export data. The website provides a simple and easy way of purchasing medications and safely checking drug interactions, as well as managing health-related information for themselves.

The app allows two types of users:

### Regular User:
- View all products with their details.
- Add products to the list.
- Remove products from the list.

### Admin:
- Add new products.
- Delete products.
- Update products.

### The Authentication:
- Login and sign up using Auth0.

---

## User Requirements

### User Registration and Login
- Users should be able to register for an account with essential details like name, email, and password.
- Users should be able to log in securely using email and password or other authentication methods.

### Product Browsing
- Users should be able to view a variety of products available in the pharmacy.
- All products should display the following details:
  - Product name
  - Price
  - Generic name
  - Pack size
  - Description of use and side effects

### Drug Interaction Checker
- Users should be able to check for drug interactions by entering the names of two medications.
- The system should return a result indicating whether there are any potential interactions.

### Order List
- Users should be able to view and manage their orders/list.
- Each order should include product details and price.

### Admin Features:
- The admin has the same capabilities as the regular user, with additional features:
  - Add a product.
  - Update a product.
  - Delete a product.

---

## Technologies

- **React**
- **npm**
- **Bootstrap**
- **API Fetch**
- **Local Storage**

---

## Getting Started

**Clone the project**  
   Navigate to the project directory: cd tabsy
   npm start
