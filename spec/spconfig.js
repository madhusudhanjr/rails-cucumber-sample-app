var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

    exports.config = {
        framework: 'jasmine',
        seleniumAddress: 'http://localhost:4444/wd/hub',
        multiCapabilities: [
            {'browserName': 'chrome'} //, {'browserName': 'firefox'}
       ],
        maxSessions: 1,
        specs: [
            'upwork_valid_and_invalid_signup.js'
        ],
        onPrepare: function () {
            browser.manage().window().maximize();
            // jasmine.getEnv().throwOnExpectationFailure(true);
            jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                savePath: '.test/reports/'

            })

        );
    }

};

