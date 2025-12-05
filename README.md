# PlaywrightTS_Orange

[![Playwright Tests](https://github.com/pedroagusb/PlaywrightTS_Orange/actions/workflows/playwright.yml/badge.svg)](https://github.com/pedroagusb/PlaywrightTS_Orange/actions/workflows/playwright.yml)


Modern E2E automation framework for OrangeHRM using Playwright and TypeScript with professional testing patterns.

## 🎯 Project Overview

This framework demonstrates enterprise-level test automation implementation featuring:

- Type-safe Page Object Model architecture
- Composable fixtures for dependency injection
- Data-driven testing capabilities
- Robust element selection strategies with loading state management

## 🛠️ Tech Stack

- **Framework:** Playwright (Latest)
- **Language:** TypeScript
- **Application Under Test:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)
- **Node:** 20.18.0
- **npm:** 11.6.0

## ✨ Features

### Implemented Functionality

- ✅ **Admin Module - Complete CRUD Operations**
  - Create users with role-based permissions
  - Search users by username, status, and role
  - Update user information with flexible partial updates
  - Delete users with confirmation handling
  - Data-driven test generation

- ✅ **Dashboard Navigation**
  - Multi-level menu navigation
  - State tracking and verification
  - Loading spinner handling

### Technical Highlights

- **Custom Dropdown Handling** - Non-standard `<select>` elements
- **Autocomplete Fields** - Dynamic suggestion handling
- **Label-Based Selection** - Maintainable element location strategy
- **Loading State Management** - Robust wait strategies
- **Type-Safe Test Data** - TypeScript interfaces and helper functions
- **Flexible Updates** - `Partial<>` pattern for optional field updates

## 📁 Project Structure

```text
playwright_dashboard/
├── src/
│   ├── config/
│   │   ├── credentials.ts       # Authentication configuration
│   │   └── environments.ts      # Environment settings
│   ├── data/
│   │   └── employees.data.ts    # Test data with helper functions
│   ├── fixtures/
│   │   └── allFixtures.fixture.ts  # Playwright fixtures (DI pattern)
│   ├── pages/
│   │   ├── base/
│   │   │   └── BasePage.ts      # Base page with reusable helpers
│   │   ├── AdminPage.ts         # Admin module page object
│   │   ├── DashboardPage.ts     # Dashboard navigation
│   │   └── LoginPage.ts         # Authentication page
│   └── types/
│       ├── dashboard.types.ts   # Navigation state interfaces
│       ├── employee.types.ts    # Employee data interfaces
│       └── user.types.ts        # User/credential interfaces
├── tests/
│   ├── admin.spec.ts            # Admin CRUD operations
│   ├── admin-data-driven.spec.ts  # Data-driven test suite
│   └── dashboard.spec.ts        # Navigation tests
├── playwright.config.ts         # Playwright configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.18.0 or higher
- npm 11.6.0 or higher

### Installation

```bash
# Clone repository
git clone https://github.com/pedroagusb/PlaywrightTS_Orange.git
cd PlaywrightTS_Orange

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/admin.spec.ts

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium

# Run with UI mode (interactive)
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

### Running Data-Driven Tests

```bash
# Run data-driven suite (generates multiple tests from single dataset)
npx playwright test tests/admin-data-driven.spec.ts
```

## 🧪 Test Coverage

### Admin Module

- ✅ User creation with validation
- ✅ User search by multiple criteria
- ✅ User update operations
- ✅ User deletion with confirmation
- ✅ Data-driven test generation (5 test cases)

### Dashboard

- ✅ Multi-level navigation
- ✅ Navigation state verification

## 🏗️ Architecture Patterns

### Page Object Model

- **BasePage** provides reusable helpers (click, fill, wait strategies)
- **Inheritance** enables shared functionality across page objects
- **Encapsulation** keeps selectors and logic within page classes

### Fixtures Pattern

```typescript
// Dependency injection with Playwright fixtures
test('example', async ({ adminPage }) => {
    // adminPage already authenticated and ready to use
});
```

### Data-Driven Testing

```typescript
// Single test definition generates multiple test cases
employeeTestData.forEach((testData, index) => {
    test(`Case ${index + 1}`, async ({ adminPage }) => {
        const employee = generateEmployee(testData);
        // Test execution with unique data
    });
});
```

### Label-Based Selection

```typescript
// Selectors based on visible labels (more maintainable)
await this.fillFormText('Username', 'testuser');
await this.selectDropdownOption('User Role', 'Admin');
```

## 🎯 Key Design Decisions

### Why `:text-is()` over `:has-text()`?

- Exact match prevents strict mode violations
- Case-insensitive for flexibility
- Handles whitespace and child nodes gracefully

### Why `Locator` return types?

- Maintains Playwright's auto-waiting capabilities
- Prevents flaky tests from premature data extraction
- Enables chainable assertions

### Why `Partial<>` for updates?

- Update only necessary fields
- Type-safe optional properties
- Flexible method signatures

## 📈 Roadmap

### Phase 1: Admin Module ✅ (Complete)

- CRUD operations
- Data-driven testing
- Table validation

### Phase 2: PIM Module (Planned)

- Employee records management
- Personal/Contact/Job details
- Advanced form handling

### Phase 3: Advanced Features (Planned)

- API testing integration
- CI/CD pipeline setup
- Multi-browser execution reports
- Visual regression testing

## 🤝 Contributing

This is a personal learning project demonstrating professional automation patterns. Feel free to fork and adapt for your own learning purposes.

## 📝 License

This project is created for educational purposes.

---

**Built with Playwright + TypeScript** 🎭
