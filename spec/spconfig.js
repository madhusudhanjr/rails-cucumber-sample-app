var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

    exports.config = {
        framework: 'jasmine',
        seleniumAddress: 'http://localhost:4444/wd/hub',
        capabilities: {
            'browserName': 'chrome',
            'chromeOptions': {
                prefs: {
                    download: {
                        'prompt_for_download': false,
                        'directory_upgrade': true,
                        'default_directory': '/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor'
                    }
                }
            }
        },

        params: {
            download_path: '/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor/'
        },
        maxSessions: 1,
        specs: [
            'download_values_to_excel.js'
        ],
        onPrepare: function () {
            browser.manage().window().maximize();
            jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
                savePath: '.test/reports/'

            })

        );
    }

};

