

describe('Should allow user to login with valid credentials', function() {

    beforeAll(function()  {
        console.log('beforeAll');
    });

        var pageLoaded = false;
        beforeEach(function () {
            if (!pageLoaded) {
                browser.driver.get('https://www.upwork.com/ab/account-security/login');
                pageLoaded = true;
                expect(browser.getTitle()).toEqual('Log In - Upwork');
                console.log('beforeEach');
            }
        });
        afterEach(function()  {
            console.log('afterEach');
        });

        afterAll(function() {
            console.log('afterAll');
        });

        it('Entervalid UserName', function() {
            element(by.model('username')).sendKeys('manju.rswamy1wwwesq123@gmail.com');
        });


        it('Entervalid Password', function() {
            element(by.model('password')).sendKeys('manjuswamy1');
        });

    it('Clcik on Signup Button', function() {
        element(by.css('[type="submit"]')).click();
    });

});
