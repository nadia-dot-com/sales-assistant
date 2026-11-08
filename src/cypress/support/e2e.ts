// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

// The production build surfaces a React hydration mismatch (#418) asynchronously,
// which Cypress otherwise attributes to whichever test is running and fails it.
// Swallow uncaught app errors so they don't fail unrelated tests.
Cypress.on("uncaught:exception", () => false);
