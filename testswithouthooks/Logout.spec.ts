/**
 * Test Case: User Logout
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to the Login page from the Home page
 * 3) Perform login with valid credentials
 * 4) Verify login by checking the presence of the 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify navigation back to the Home Page
 */


import { test, expect } from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

test('User logout test @master@regression', async ({ page }) => {

    const config = new TestConfig(); // create instance
    await page.goto(config.appUrl);    // getting appURL from test.config.ts file

    let homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    let loginPage = new LoginPage(page);

    // login
    await loginPage.login(config.email, config.password);

    // Assertion
    let myAccountPage = new MyAccountPage(page);
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    let logoutPage:LogoutPage =await myAccountPage.clickLogout(); //After clickin on logout, it returns LogoutPage

    // Verify button is visible before clicking
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    // Click continue and get redirected to HomePage
    homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);


});