var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    framework: 'jasmine',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    multiCapabilities: [
        {'browserName': 'chrome'},
       {'browserName': 'firefox'}

   ],

    maxSessions: 1,


    specs: [

         'RegistrationScenario.js',
        'LoginScenario.js',

    ],

    onPrepare: function () {
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: '.test/reports/'

        })

);
}


};
