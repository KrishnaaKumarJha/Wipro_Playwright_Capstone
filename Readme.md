# IKEA India Frontend Automation Framework using Playwright

## Project Overview

Enterprise-level frontend automation framework developed using Playwright and JavaScript for the IKEA India website.

The framework covers:
- UI Automation
- Search & Filters
- Product Validations
- Cart Functionality
- Session Handling
- API Validation
- Cross Browser Testing
- Responsive Testing

---

# Website Under Test

https://www.ikea.com/in/en/

---

# Technology Stack

- Playwright
- JavaScript
- Node.js
- Allure Reports
- Git & GitHub
- VS Code

---

# Services Covered

1. Homepage & Navigation
2. Authentication UI Validation
3. Search Functionality
4. Product Listing & Categories
5. Filters & Sorting
6. Product Details
7. Cart / Bag Functionality
8. API & Session Validation
9. Responsive UI Validation
---

# Framework Features

- Page Object Model (POM)
- Assertions & Validations
- Screenshots on Failure
- Cross Browser Testing
- Parallel Execution
- API & Network Validation
- Session Persistence Testing
- Allure Reporting

---

# Estimated Test Coverage

125-130 Automated Test Cases

---

# Installation

```bash
npm install
```

```bash
npx playwright install
```

---

# Run Tests

```bash
npx playwright test
```

---

# Allure Reports

The framework is pre-configured with Allure Reporting. To generate and view the test execution reports locally:

### Prerequisites
- **Java (JDK/JRE 8 or higher)** must be installed on your local machine and configured in your system `PATH` variable. Allure Commandline requires Java to parse and generate HTML reports.

### 1. Run Tests (Generates results)
Running the tests automatically creates or updates the raw report data in the `allure-results` directory:
```bash
npx playwright test
```

### 2. Generate HTML Report
Compile the raw results into a shareable HTML report:
```bash
npm run allure:generate
```
This cleans the previous report and places the new one under `allure-report/`.

### 3. Open Report in Browser
Launch a local web server to open and view the report in your default browser:
```bash
npm run allure:open
```

---

# Supported Browsers

- Chromium
- Firefox
- WebKit

---

# Author
## Krishna Kumar Jha
