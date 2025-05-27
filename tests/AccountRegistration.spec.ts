/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

// Reusable test hooks
test.beforeEach(async ({ page }) => {
  // Initialize configuration
  config = new TestConfig();

  // Navigate to application URL before each test
  await page.goto(config.appUrl);

  // Instantiate page objects
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  // Optional cleanup step: can be used to log out or close popups if required
  await page.close();
});

test('User registration test @master @sanity @regression', async ({ page }) => {
  // Step 1: Navigate to 'My Account' and click 'Register'
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  // Step 2: Fill in registration details using random data utility
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  // Step 3: Set password and confirm password
  const password = RandomDataUtil.getPassword();
  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);

  // Step 4: Agree to Privacy Policy and submit the form
  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  // Step 5: Validate confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain('Your Account Has Been Created!');

  // Optional wait to visually verify the result in demo/testing phase
  await page.waitForTimeout(3000); 
});
