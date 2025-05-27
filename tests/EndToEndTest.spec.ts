/**
 * Test Case: End-to-End test
 * 
 * Steps:
 * 1) Perform Account Registration
 * 2) Logout after successful registration
 * 3) User Login with the registered email
 * 4) Search product and add to cart
 * 5) Verify Shopping Cart contents
 * 6) Perform Checkout process  // feature not available since it is demo site
 */


import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LogoutPage } from '../pages/LogoutPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';


// End-to-End test
test('execute end-to-end test flow', async ({ page }) => {
    // Navigate to the application URL
    const config = new TestConfig();
    await page.goto(config.appUrl);    // getting appURL from test.config.ts file

    // Step 1: Perform Account Registration
    let registeredEmail: string = await performRegistration(page);

    // Step 2: Logout after successful registration
    await performLogout(page);

    // Step 3: User Login with the registered email
    await performLogin(page, registeredEmail);

    // Step 4: Search product and add to cart
    await addProductToCart(page);

    // Step 5: Verify Shopping Cart contents
    await verifyShoppingCart(page);

    // Step 6: Perform Checkout process (commented as per original)
    await performCheckout(page);
});

async function performRegistration(page: Page): Promise<string> {
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const registrationPage = new RegistrationPage(page);
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());

    let email: string = RandomDataUtil.getEmail();

    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    await registrationPage.setPassword("test123");
    await registrationPage.setConfirmPassword("test123");

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');
    return email;

}


async function performLogout(page: Page) {
    let myAccountPage = new MyAccountPage(page);
    let logoutPage: LogoutPage = await myAccountPage.clickLogout(); //After clickin on logout, it returns LogoutPage

    // Verify button is visible before clicking
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    // Click continue and get redirected to HomePage
    const homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);
}

async function performLogin(page: Page, email: string) {
    const config = new TestConfig(); // create instance
    await page.goto(config.appUrl);    // getting appURL from test.config.ts file

    const homePage = new HomePage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);

    // using the combined method
    await loginPage.login(email, "test123");

    // Assertion
    const myAccountPage = new MyAccountPage(page);
    console.log("Is My Account Page exists:==========>", await myAccountPage.isMyAccountPageExists());
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

async function addProductToCart(page: Page) {
    const homePage = new HomePage(page);

    const config = new TestConfig();
    let productName: string = config.productName;
    let productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    // Verify search results page
    const searchResultsPage = new SearchResultsPage(page);
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Check if product exists
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    if (await searchResultsPage.isProductExist(productName)) {
        const productPage = await searchResultsPage.selectProduct(productName);
        await productPage?.setQuantity(productQuantity);
        await productPage?.addToCart();
        await page.waitForTimeout(3000);
        expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();

    }
}

async function verifyShoppingCart(page: Page) {

    const productPage = new ProductPage(page);
    await productPage.clickItemsToNavigateToCart();
    const shoppingcartPage: ShoppingCartPage = await productPage.clickViewCart();

    // Verify total price
    const config = new TestConfig();
    //expect(await shoppingcartPage.getTotalPrice()).toBe(config.totalPrice);
    expect(await shoppingcartPage.getTotalPrice()).toContain('$2,408.00');
 
}

async function performCheckout(page: Page) {

    page.pause();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.setFirstName(RandomDataUtil.getFirstName());
    await checkoutPage.setLastName(RandomDataUtil.getLastName());
    await checkoutPage.setAddress1(RandomDataUtil.getRandomAddress());
    await checkoutPage.setAddress2(RandomDataUtil.getRandomAddress());
    await checkoutPage.setCity(RandomDataUtil.getRandomCity());
    await checkoutPage.setPin(RandomDataUtil.getRandomPin());
    await checkoutPage.setCountry(RandomDataUtil.getRandomCountry());
    await checkoutPage.setState(RandomDataUtil.getRandomState());

    await checkoutPage.clickOnContinueAfterBillingAddress();
    await checkoutPage.clickOnContinueAfterDeliveryAddress();
    await checkoutPage.setDeliveryMethodComment("testing...");
    await checkoutPage.clickOnContinueAfterDeliveryMethod();
    await checkoutPage.selectTermsAndConditions();
    await checkoutPage.clickOnContinueAfterPaymentMethod();
    // As per original test, this is commented out for demo site
}

