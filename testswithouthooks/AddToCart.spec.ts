
/**
 * Test Case: Add Product to Cart
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search text box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product from the search results
 * 6. Set the desired quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */


import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { TestConfig } from '../test.config';


test('Search Product test @master@regression', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);  // get the URL from TestConfig

    const homePage = new HomePage(page);
    await homePage.enterProductName(config.productName);
    await homePage.clickSearch();

     // Verify search results page
    const searchResultsPage = new SearchResultsPage(page);
     expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    // Check if product exists
    const productName = config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();
    
    if (await searchResultsPage.isProductExist(productName)) {
        const productPage = await searchResultsPage.selectProduct(productName);
        await productPage?.setQuantity(config.productQuantity);
        await productPage?.addToCart();
        await page.waitForTimeout(3000);
        expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();

    }

});