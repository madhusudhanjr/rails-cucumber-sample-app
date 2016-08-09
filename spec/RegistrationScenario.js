describe('should allow user to Signup ', function() {
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


    it('User should Complete Signup process', function () {

        console.log("welcome to Upwork Page");
        expect(element(by.id('signup123')).isDisplayed()).toBe(true);
        element(by.id('signup')).click();
        console.log("User Clicked on Signup link");
    });


    it('Compare the Title of Signup Page', function () {
        console.log("Comapare Title of the Sign up page is equal to Create an Account - Upwork");
        expect(browser.getTitle()).toEqual('Create an Account - Upwork');
    });


    it('User click on Hire button', function () {
        var Hire_btn=element(by.xpath('//a[text()="Hire"]'));
        expect(Hire_btn.isDisplayed()).toBe(true);
        expect(Hire_btn.getText()).toEqual('Hire');
        Hire_btn.click();
        console.log("User Clicked on Hire Button");

    });



    it('User Entered First name', function () {

        expect(element(by.model('userAccount.firstName')).isPresent()).toBe(true);
        element(by.model('userAccount.firstName')).sendKeys('sampleOletest');
        expect(element(by.model('userAccount.firstName')).getAttribute('value')).toBe('sampleOletest');
        console.log("User has Entered FirstName");
    });


    it('User Entered Last name', function () {

        expect(element(by.model('userAccount.lastName')).isPresent()).toBe(true);
        element(by.model('userAccount.lastName')).sendKeys('MR');
        expect(element(by.model('userAccount.lastName')).getAttribute('value'))
            .toBe('MR');

        console.log("User has Entered Lastname");
    });



    it('User Entered company Name', function () {

        expect(element(by.xpath('//input[@name="companyName"]')).isPresent()).toBe(true);
        element(by.xpath('//input[@name="companyName"]')).sendKeys('ITC Infotech');
        console.log("User has Entered Company Name");
    });



    it('User Entered Email', function () {

        expect(element(by.model('userAccount.email')).isPresent()).toBe(true);
        element(by.model('userAccount.email')).sendKeys('Test.rew@gmail.com');
    });


    it('User Entered Password', function () {
        expect(element(by.model('userAccount.password')).isPresent()).toBe(true);
        element(by.model('userAccount.password')).sendKeys('manjuswamy1');
        expect(element(by.model('userAccount.password')).getAttribute('value'))
            .toBe('manjuswamy1');
    });


    it('User Click on I accept check box', function () {

        element.all(by.css('.checkbox-replacement-helper')).get(1).click();
          });



    it('User click on Submit button', function () {
        element(by.css('[type="submit"]')).click();
        console.log("End of Test");

    });


});