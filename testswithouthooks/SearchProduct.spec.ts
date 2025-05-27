/**
 * Test Case: Product Search
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to the Home page and initiate product search
 * 3) Enter the product name in the search field
 * 4) Click on the search button
 * 5) Verify if the product is displayed in the search results
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';


test('Search Product test @master@regression', async ({ page }) => {
    
    const config = new TestConfig(); 
    await page.goto(config.appUrl);  // get the URL from TestConfig
    
    const homePage = new HomePage(page);
    await homePage.enterProductName(config.productName);
    await homePage.clickSearch();

    const searchResultsPage = new SearchResultsPage(page);
    
    // Verify search results page
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    
    // Check if product exists
    const productName = config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();
   
      
});