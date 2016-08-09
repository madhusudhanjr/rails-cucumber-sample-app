var LoginPage = function() {
    this.userInput = element(by.model('username'));
    this.passwordInput = element(by.model('password'));
    this.loginButton = element(by.css('[type="submit"]'));

    this.get = function () {

        browser.driver.get('https://www.upwork.com/ab/account-security/login');
    };

    //One method
    this.login = function (username, password) {
        this.userInput.sendKeys(username);
        this.passwordInput.sendKeys(password);
        this.loginButton.click();
    };
};

     describe('login', function () {

        it('welcomes the user', function () {

            var loginPage = new LoginPage();
            loginPage.get();
            loginPage.login('supertesterole', 'supertest1')


        });
    });

