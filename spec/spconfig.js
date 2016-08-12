var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

    exports.config = {
        framework: 'jasmine',
        seleniumAddress: 'http://localhost:4444/wd/hub',
        Capabilities: [
            {
                'browserName': 'chrome', //, {'browserName': 'firefox'}
                'platform': 'ANY',
                'version': 'ANY',
                'chromeOptions': {
                    // Get rid of --ignore-certificate yellow warning
                    args: ['--no-sandbox', '--test-type=browser'],
                    // Set download path and avoid prompting for download even though
                    // this is already the default on Chrome but for completeness
                    prefs: {
                        'download': {
                            'prompt_for_download': false,
                            'default_directory': '/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor'
                        },
                    },
                },
            }
       ],
        maxSessions: 1,
        specs: [
            //'upwork_valid_and_invalid_signup.js'
            'download_values_to_excel.js'
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

