 // Step definition for BSE download data in excel sheet and verify

var pageLoaded = false;
beforeEach(function () {
    if (!pageLoaded) {
        browser.get('http://www.bseindia.com');
        pageLoaded = true;
        expect(browser.getTitle()).toEqual('Equity Market Shares | Equity Market Reports | BSE');
        console.log("WebPage is Loaded")
   }
});

//click on S&P BSE SENSEX link
it('should allow to click on S&P BSE SENSEX link', function () {
    var sp_bse_link = element(by.a(text: 'S&P BSE SENSEX')
    expect(sp_bse_link.isDisplayed()).toBe(true);
    expect(sp_bse_link.getText()).toEqual('S&P BSE SENSEX');
    sp_bse_link.click();
    console.log("User Clicked on S&P_BSE_SENSEX_link");

// check S&P BSE SENSEX Heatmap
it('should allow to get S&P BSE SENSEX Heatmap', function () {
    var label_text = element(by.class('h1.srcompanynametext'))
    expect(label_text{td[0]}.getText()).toEqual('S&P BSE SENSEX');
    console.log("S&P BSE SENSEX is being Displayed");
}

//click on Download Icon of CSV File
it('should allow to download excel', function () {
    var Download_Icon = element(by.id('ctl00_ContentPlaceHolder1_imgDownload'))
    Download_Icon.click();
    console.log("User Clicked on Download_Icon");

}
 