// Step definition for BSE download data in excel sheet and verify

describe('should allow user to download data in excel', function() {
    var pageLoaded = false;
    beforeEach(function () {
        if (!pageLoaded) {
            browser.ignoreSynchronization = true;
            browser.get('http://www.bseindia.com');
            pageLoaded = true;
            console.log("WebPage is Loaded")
       }
    });

    // click on S&P BSE SENSEX link
    it('should allow to click on S&P BSE SENSEX link', function () {
        var sp_bse_link = element(by.linkText('S&P BSE SENSEX'));
        sp_bse_link.click();
        console.log("User Clicked on S&P_BSE_SENSEX_link");
    });

    // check S&P BSE SENSEX Heatmap
    it('should allow to get S&P BSE SENSEX Heatmap', function () {
        var label_text = element(by.css('h1.srcompanynametext'));
        console.log("S&P BSE SENSEX is being Displayed");
    });

    // click on more
    it('should allow to click on more for table report', function () {
        var moreLink = element(by.xpath('//*[@id="wrap"]/div/div/div[4]/div[2]/div/div/div[1]/div[2]/div/a/img'));
        moreLink.click();
        console.log("User Clicked on more link");
    });

    // should allow to switch to current window in browser
    it('should allow to switch to current window', function () {
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]).then(function(){
            });
        });
    });

    // Download the csv file
    it('should allow to download excel', function () {
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var fs = require('fs');
        var filePath = "/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor/MarketWatch_" + day + "-00-" + year + ".csv"; 
        fs.unlinkSync(filePath);
        var Download_Icon = element(by.id('ctl00_ContentPlaceHolder1_imgDownload'))
        Download_Icon.click();
        console.log("User Clicked on Download_Icon");
        browser.sleep(1000);
    });

    // Verify the contents of downloaded CSV File
    it('should allow to verify data from downloaded excel', function () {
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var Converter = require("csvtojson").Converter;
        var converter = new Converter({});
        converter.fromFile("/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor/MarketWatch_" + day + "-00-" + year + ".csv",function(err,result){
          var jsonData =  JSON.stringify(result);
        });
    });

    // Validate data from sheet to web report
    it('should allow to verify data from downloaded excel', function () {
        var log4js = require('log4js'); 
        log4js.loadAppender('file');
        log4js.addAppender(log4js.appenders.file('log/protractor.log'), 'protractor'); 
        var logger = log4js.getLogger('protractor');
        
        var date = new Date();
        var day = date.getDate();
        var year = date.getFullYear();
        var tabledata = element.all(by.css("#ctl00_ContentPlaceHolder1_grd1"));
        var rows = tabledata.all(by.tagName("tr"));
        var cells = rows.all(by.tagName("td"));
        var somedata = rows.map(function(elm) {
            return elm.getText();
        });
        var fs = require('fs');
        var csv = require('fast-csv');
        var tArray=[];
        fs.createReadStream("/home/devbob/devbob/ITC/rails-cucumber-sample-app/tmp/downloads-protractor/MarketWatch_" + day + "-00-" + year + ".csv")
        .pipe(csv())
        .on('data',function(data){
            tArray.push(data.join(" "));
        })
        .on('end',function(data){
            for(i=0; i<=tArray.length; i++){
                try {
                    logger.info(tArray[i]);
                    expect(rows.get(i).getText()).toContain(tArray[i].split(" ")[0]);
                } catch(e) {
                    logger.debug(e.message);    
                }
                
            }
        });
    });
        
});