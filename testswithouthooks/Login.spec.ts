/**
 * Test Case: Login with Valid Credentials
 * 
 * Steps: 
 1) Navigate to the application URL 
 2) Navigate to the Login page from the Home page 
 3) Perform login with valid credentials 
 4) Verify login by checking the presence of the 'My Account' page
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

test('User login test @master@sanity@regression', async ({ page }) => {

    const config = new TestConfig(); // create instance
    await page.goto(config.appUrl);    // getting appURL from test.config.ts file

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);

    // Individual steps approach
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    // OR using the combined method
    //await loginPage.login(config.email, config.password);

    // Assertion
    const myAccountPage = new MyAccountPage(page);
    console.log("Is My Account Page exists:==========>",await myAccountPage.isMyAccountPageExists());
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

});