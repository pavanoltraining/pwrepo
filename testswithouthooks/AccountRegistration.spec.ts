/**
 * Test Case: Account Registration
 * 
 * Steps: 1) Navigate to application URL 
 * 2) Navigate to 'My Account' and click 'Register' 
 * 3) Fill in registration details 
 * 4) Agree to Privacy Policy and submit registration 
 * 5) Validate confirmation message
 */


import { test, expect,Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';


test('User registration test @master@sanity@regression', async ({page}) => {

  const config = new TestConfig(); // create instance
  await page.goto(config.appUrl);    // getting appURL from test.config.ts file

  const homePage = new HomePage(page);
  await homePage.clickMyAccount();
  await homePage.clickRegister();

  const registrationPage = new RegistrationPage(page);
  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getLastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  const password = RandomDataUtil.getPassword();
  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain('Your Account Has Been Created!');

  await page.waitForTimeout(5000);
});
