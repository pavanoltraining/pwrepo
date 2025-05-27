/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  await page.goto(config.appUrl); // Navigate to base URL

  // Initialize page objects
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close browser tab (good practice in local/dev run)
});

test('User login test @master @sanity @regression', async () => {
  // Step 1: Navigate to Login page
  await homePage.clickMyAccount();
  await homePage.clickLogin();

  // Step 2: Enter valid login credentials from config
  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  // Alternative: Use combined login() method if defined in LoginPage
  // await loginPage.login(config.email, config.password);

  // Step 3: Assert login by checking 'My Account' page
  const isLoggedIn = await myAccountPage.isMyAccountPageExists();
  console.log("Is My Account Page exists:", isLoggedIn);
  expect(isLoggedIn).toBeTruthy(); // Expect login to succeed
});
