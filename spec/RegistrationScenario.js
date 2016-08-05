describe('should allow user to Signup  ', function() {
    beforeAll(function()  {
        console.log('beforeAll');
    });

    var pageLoaded = false;
    beforeEach(function () {
        if (!pageLoaded) {
            browser.get('https://www.upwork.com/');
            pageLoaded = true;
            expect(browser.getTitle()).toEqual('Upwork - Hire Freelancers & Get Freelance Jobs Online');
        }
    });


    it('should Signup process', function () {
        console.log("welcome to signup page");
        
        element(by.id('signup')).click();
        
        element(by.xpath('//a[text()="Hire"]')).click();
        
        element(by.model('userAccount.firstName')).sendKeys('sampleOletest');
        
        expect(element(by.model('userAccount.firstName')).getAttribute('value')).toBe('sampleOletest');
        
        console.log("FirstName Entered");
        
        element(by.model('userAccount.lastName')).sendKeys('MR');

        expect(element(by.model('userAccount.lastName')).getAttribute('value')).toBe('MR');

        console.log("LastName Entered");
        console.log("Comapny Name");

        element(by.xpath('//input[@name="companyName"]')).sendKeys('BTS');

        console.log("company Entered");
        
        element(by.model('userAccount.email')).sendKeys('manju.rswamy1wwwesq123@gmail.com');

        element(by.model('userAccount.password')).sendKeys('manjuswamy1');

        expect(element(by.model('userAccount.password')).getAttribute('value')).toBe('manjuswamy1');

        console.log("Before clicking on checkbox");

        browser.sleep(1000);

        function toggle(checked) {
            var elm = element(by.xpath('//div[@class="checkbox m-xs-bottom"]/label'));
            if (checked != elm.checked) {
                elm.click();
            }
            expect(elm.isSelected()).toBeTruthy();
        }

        browser.sleep(1000);
        console.log("Check box checked");
        browser.sleep(1000);

        element.all(by.css('.checkbox-replacement-helper')).get(1).click();

        element(by.css('[type="submit"]')).click();

        console.log("End of Test");
    });
});
