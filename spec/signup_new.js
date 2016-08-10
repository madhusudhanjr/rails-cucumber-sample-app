
// Constructor have two getter methods which finds element in DOM and return the same for executing action
var FindElement = function(){
    this.getsignupElement = function(locator, is_mandate) {
      try {
        var signUpInput = element(by.id(locator));
        expect(signUpInput.isDisplayed()).toBe(true);
        return signUpInput;
      } catch (e) {
        var log4js = require('log4js'); 
        log4js.loadAppender('file');
        log4js.addAppender(log4js.appenders.file('log/protractor.log'), 'protractor'); 
        var logger = log4js.getLogger('protractor');
        logger.debug(e.stack);
        if (is_mandate) {
          browser.driver.close().then(function()
          {
            process.exit(1);
          });
        } else {
          return true;
        }
      }
    };

    this.getIputTextField = function(locator, is_mandate) {
      try {
        var inputTextField = element(by.model(locator));
        // console.log("elem :            " + inputTextField);
        // console.log("Expcted :      " + expect(inputTextField.isPresent()).toBe(true));
        // inputTextField.isPresent().toBe(true);
        return inputTextField;
      } catch (e) {
        var log4js = require('log4js');
        log4js.loadAppender('file');
        log4js.addAppender(log4js.appenders.file('log/protractor.log'), 'protractor'); 
        var logger = log4js.getLogger('protractor');
        if (is_mandate == true) {
          // Exit process and close browser window
        } else {
          return true;
        }
        logger.debug(e.stack);       
      }
    };
};

// Step definitions
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

    it('User should Complete Signup process', function () {
        var findElement = new FindElement();
        var signUpLink  = findElement.getsignupElement('signup', true);
        signUpLink.click();
        console.log("welcome to Upwork Page");
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
        var findElement = new FindElement();
        var firstNameTextField  = findElement.getIputTextField('userAccount.firstName', true);
        firstNameTextField.sendKeys('sampleOletest');
        console.log("User has Entered FirstName");
    });

    it('User Entered Last name', function () {
        var findElement = new FindElement();
        var lastNameTextField  = findElement.getIputTextField('userAccount.lastName', true);
        lastNameTextField.sendKeys('MR');
        console.log("User has Entered Lastname");
    });

    it('User Entered company Name', function () {

        expect(element(by.xpath('//input[@name="companyName"]')).isPresent()).toBe(true);
        element(by.xpath('//input[@name="companyName"]')).sendKeys('ITC Infotech');
        console.log("User has Entered Company Name");
    });

    it('User Entered Email', function () {
        var randomValue = Date.now();
        var findElement = new FindElement();
        var emailTextField  = findElement.getIputTextField('userAccount.email', true);
        emailTextField.sendKeys('Test.rew' + randomValue + '@gmail.com');
    });

    it('User Entered Password', function () {
        var findElement = new FindElement();
        var passwordTextField  = findElement.getIputTextField('userAccount.password', true);
        passwordTextField.sendKeys('Password@123');
    });

    it('User Click on I accept check box', function () {
        element.all(by.css('.checkbox-replacement-helper')).get(1).click();
    });

    it('User click on Submit button', function () {
        element(by.css('[type="submit"]')).click();
        console.log("End of Test");
    });

});
