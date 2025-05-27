````markdown
# Demo SaaS E2E Test Automation with Cypress

This repository contains end-to-end (E2E) automated tests for the Demo SaaS platform using [Cypress](https://www.cypress.io/). These tests cover critical user flows including signup, login, ticket management, organization settings, and security validations.

---

## Table of Contents

- [Overview](#overview)  
- [Tech Stack](#tech-stack)  
- [Test Structure](#test-structure)  
- [Setup](#setup)  
- [Running Tests](#running-tests)  
- [Custom Commands](#custom-commands)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

Automated Cypress tests ensure the Demo SaaS app functions as expected with positive and negative scenarios, accessibility compliance, and security safeguards.

---

## Tech Stack

- Cypress for E2E testing  
- JavaScript/Node.js  
- Mocha & Chai (built into Cypress)  

---

## Test Structure

| File                          | Purpose                                      |
|-------------------------------|----------------------------------------------|
| `signup_form_validation.cy.js` | Signup form validation tests                  |
| `signup_accessibility.cy.js`  | Signup accessibility tests                    |
| `signup_security.cy.js`       | Signup security validations                    |
| `loginPageValidation.cy.js`   | Login page validation tests                    |
| `TicketsPageValidation.cy.js` | Tickets page search, filter, pagination tests |
| `StatusFilter.cy.js`          | Ticket status filter dropdown tests           |
| `SearchFunctionality.cy.js`   | Ticket search feature tests                    |
| `settingsPage.cy.js`          | Organization members and settings page tests  |
| `userDropdownAndOrg.cy.js`    | User dropdown & organization selector tests   |

---

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/bytecraft-rafi/DemoSaaS_E2E_Test_Automation_Cypress.git
   cd DemoSaaS_E2E_Test_Automation_Cypress
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure `node_modules` is excluded via `.gitignore`.

---

## Running Tests

* Open Cypress Test Runner:

  ```bash
  npx cypress open
  ```

* Run all tests headlessly:

  ```bash
  npx cypress run
  ```

---

## Custom Commands

Reusable commands like `cy.login()` for authentication are defined in `cypress/support/commands.js`.

---

## Contributing

Contributions, bug reports, and improvements are welcome! Please fork the repository and open pull requests.





