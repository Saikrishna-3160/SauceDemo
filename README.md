# SauceDemo – Playwright + TypeScript E2E Test Automation

End-to-end functional test automation for the **SauceDemo** web application using **Playwright Test** and **TypeScript**.  
The project follows a **Page Object Model (POM)** structure, uses a **custom fixture** for authenticated sessions, and centralizes credentials/test inputs in a single test data module.

## Tech Stack
- **Playwright Test** (`@playwright/test`)
- **TypeScript**
- Node.js (npm)

## Project Structure

```text
.
├── .github/workflows/
│   └── copilot-setup-steps.yml
├── data/
│   └── testData.ts
├── fixtures/
│   └── loginFixture.ts
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   └── CheckoutOverviewPage.ts
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout-info.spec.ts
│   └── checkout-overview.spec.ts
├── playwright.config.ts
├── package.json
└── testplan.md
