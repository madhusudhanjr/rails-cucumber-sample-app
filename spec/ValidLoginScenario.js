var LoginPage = function() {
    var userInput = element(by.model('username'));
    var passwordInput = element(by.model('password'));
    var loginButton = element(by.css('[type="submit"]'));

      this.get = function () {
        browser.driver.get('https://www.upwork.com/ab/account-security/login');
    };

    this.setUserName = function(name) {
        userInput.sendKeys(name);
    };

    this.setPasswordName = function(name) {
        passwordInput.sendKeys(name);
    };

    this.clickMe = function() {
        loginButton.click();
    };
};
describe('login', function () {

        it('welcomes the user', function () {

            var loginPage = new LoginPage();
            loginPage.get();

            //expect(userInput.isDisplayed()).toBe(true);
            loginPage.setUserName('supertesterole');


            loginPage.setPasswordName('supertest1');

            loginPage.clickMe();


        });
    });

