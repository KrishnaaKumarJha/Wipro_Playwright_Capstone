# IKEA India Automation Testing Framework using Playwright

## Project Overview

This project is an End-to-End Automation Testing Framework developed using Playwright with JavaScript for the IKEA India website.

The framework is designed to simulate real-world enterprise frontend automation testing by covering multiple customer interaction workflows such as:

- Navigation Testing
- Search Functionality
- Product Listing Validation
- Filters & Sorting
- Cart Management
- Wishlist Validation
- Session Handling
- Responsive UI Testing
- API & Network Validation
- Cross-Browser Testing

The project follows industry-standard automation practices including modular framework design, reusable components, reporting integration, assertions, screenshots, and API validation.

---

# Website Under Test

## IKEA India

https://www.ikea.com/in/en/

---

# Technology Stack

| Technology | Usage |
|---|---|
| Playwright | Automation Framework |
| JavaScript | Programming Language |
| Node.js | Runtime Environment |
| Allure Reports | Reporting |
| Git & GitHub | Version Control |
| VS Code | Development Environment |

---

# Framework Features

- Page Object Model (POM)
- Modular Test Architecture
- Reusable Utility Functions
- Assertions & Validations
- Screenshots on Failure
- Trace Viewer Support
- Cross-Browser Testing
- Parallel Execution
- API & Network Validation
- Session & Storage Validation
- Responsive UI Testing
- Allure Report Integration

---

# Project Structure

```bash
capstone-project/
│
├── tests/
├── pages/
├── utils/
├── fixtures/
├── test-data/
├── screenshots/
├── reports/
├── playwright.config.js
├── package.json
└── README.md
```

---

# Modules Covered

1. Homepage & Navigation Module
2. Authentication UI Validation Module
3. Search Functionality Module
4. Product Listing & Categories Module
5. Filters & Sorting Module
6. Product Details Module
7. Cart / Bag Functionality Module
8. Favorites / Wishlist Module
9. Delivery & Store Validation Module
10. Responsive & UI Validation Module
11. Session & Persistence Module
12. API & Network Validation Module

---

# Estimated Test Coverage

| Module | Estimated Test Cases |
|---|---|
| Homepage & Navigation | 15 |
| Authentication UI Validation | 12 |
| Search Functionality | 15 |
| Product Listing & Categories | 15 |
| Filters & Sorting | 15 |
| Product Details | 15 |
| Cart / Bag Functionality | 15 |
| Favorites / Wishlist | 10 |
| Delivery & Store Validation | 10 |
| Responsive & UI Validation | 10 |
| Session & Persistence | 10 |
| API & Network Validation | 15 |

## Total Estimated Test Cases: 157+

---

# Installation & Setup

## Clone Repository

```bash
git clone <repository-url>
```

## Navigate to Project Folder

```bash
cd Wipro_SDET_Playwright_Capstone
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# Running Tests

## Run All Tests

```bash
npx playwright test
```

## Run Specific Test File

```bash
npx playwright test tests/example.spec.js
```

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

## Run Tests on Specific Browser

```bash
npx playwright test --project=chromium
```

---

# Browsers Supported

- Chromium
- Firefox
- WebKit

---

# Expected Outcome

This project demonstrates:

- Real-world Playwright automation skills
- Enterprise frontend testing practices
- Framework scalability and maintainability
- API and network validation skills
- Responsive and UI testing capabilities
- Reporting and debugging implementation
- Modular and reusable automation architecture

---

# Author

Krishna Kumar Jha