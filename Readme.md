# IKEA India Frontend Automation Framework using Playwright

## Project Overview

Enterprise-grade frontend automation framework developed using **Playwright** and **JavaScript** for the IKEA India website.

The framework follows industry-standard automation practices and provides comprehensive coverage for core user journeys, UI validations, search workflows, responsive design verification, and advanced testing enhancements.

### Key Coverage Areas

- UI Automation
- Search & Filter Validation
- Product Verification
- Cart Functionality Testing
- Responsive UI Validation
- API Validation
- Session Management Testing
- Cross-Browser Testing

---

## Website Under Test

https://www.ikea.com/in/en/

---

## Technology Stack

- Playwright
- JavaScript (ES6+)
- Node.js
- Allure Reports
- Git & GitHub
- Visual Studio Code

---

## Core Automation Modules

### Module 1 – Homepage & Navigation

- Homepage validation
- Header and footer verification
- Navigation menu testing
- Category navigation validation

### Module 2 – Authentication UI Validation

- Login/Register popup validation
- Form field verification
- Error message validation
- Authentication workflow checks

### Module 3 – Search Functionality

- Product search validation
- Search suggestions verification
- Search result validations
- Invalid search scenarios

### Module 4 – Product Listing & Categories

- Category page validation
- Product listing verification
- Product information validation
- Category navigation testing

### Module 5 – Filters & Sorting

- Filter functionality validation
- Multiple filter combinations
- Sorting options verification
- Search refinement testing

### Module 6 – Responsive UI Validation

- Mobile viewport testing
- Tablet viewport testing
- Desktop viewport testing
- Responsive layout verification
- UI consistency validation across devices

---

## Add-On Enhancement Modules

### Module 7 – Product Details Validation

- Product detail page verification
- Product specifications validation
- Product image validation
- Price and availability checks

### Module 8 – Cart / Bag Functionality

- Add-to-cart validation
- Cart updates and modifications
- Quantity management
- Cart persistence testing

### Module 9 – API & Session Validation

- API response verification
- Network request validation
- Session persistence testing
- Browser storage validation

---

## Framework Features

- Page Object Model (POM) Architecture
- Reusable Components
- Assertions & Validations
- Screenshots on Failure
- Cross-Browser Execution
- Parallel Test Execution
- API & Network Validation
- Session Persistence Testing
- Responsive UI Testing
- Allure Reporting Integration
- Scalable and Maintainable Framework Design

---

## Estimated Test Coverage

**125–130 Automated Test Cases**

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Test Execution

Run all test suites:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests on a specific browser:

```bash
npx playwright test --project=chromium
```

---

## Allure Reporting

The framework is pre-configured with Allure Reporting for detailed test execution analysis.

### Prerequisites

- Java (JDK/JRE 8 or above) installed and configured in the system PATH.
- Allure Commandline installed locally.

### Generate Test Results

```bash
npx playwright test
```

### Generate HTML Report

```bash
npm run allure:generate
```

### Open Report

```bash
npm run allure:open
```

---

## Supported Browsers

- Chromium
- Firefox
- WebKit

---

## Project Architecture

```text
project-root/
│
├── pages/
├── tests/
├── fixtures/
├── utils/
├── test-data/
├── playwright.config.js
├── package.json
├── allure-results/
└── allure-report/
```

---

## Author

### Krishna Kumar Jha

Playwright Automation Engineer | QA Automation Enthusiast