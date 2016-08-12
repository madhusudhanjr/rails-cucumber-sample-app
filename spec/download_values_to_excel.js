
var ParseCsvToJson = function(){
    this.getJsonData = function() {
      try {

        console.log("In method.........");
        var Converter = require("csvtojson").Converter;
        var converter = new Converter({});
        converter.fromFile("/home/devbob/Downloads/MarketWatch_11-00-2016.csv",function(err,result){
          var jsonData =  JSON.stringify(result)
          return jsonData;
          // console.log("result is : " + JSON.stringify(result));
        });
        
      } catch (e) {
        var log4js = require('log4js'); 
        log4js.loadAppender('file');
        log4js.addAppender(log4js.appenders.file('log/protractor.log'), 'protractor'); 
        var logger = log4js.getLogger('protractor');
        logger.debug(e.stack);
        return true;
      }
    };
};


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

    //click on S&P BSE SENSEX link
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

    //click on more
    it('should allow to click on more for table report', function () {
        var moreLink = element(by.xpath('//*[@id="wrap"]/div/div/div[4]/div[2]/div/div/div[1]/div[2]/div/a/img'));
        moreLink.click();
        console.log("User Clicked on more link");
    });

    // //click on Download Icon of CSV File
    it('should allow to switch to current window', function () {
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[1]).then(function(){
            });
        });
    });

    it('should allow to download excel', function () {
        // var Download_Icon = element(by.id('ctl00_ContentPlaceHolder1_imgDownload'))
        // Download_Icon.click();
        // console.log("User Clicked on Download_Icon");
        // browser.sleep(1000);
    });

    it('should allow to verify data from downloaded excel', function () {
        var Converter = require("csvtojson").Converter;
        var converter = new Converter({});
        converter.fromFile("/home/devbob/Downloads/MarketWatch_12-00-2016.csv",function(err,result){
          var jsonData =  JSON.stringify(result);
          // console.log("I wanted this : " + jsonData);
        });
    });

    it('should allow to verify data from downloaded excel', function () {
        // var Converter = require("csvtojson").Converter;
        // var converter = new Converter({});
        // var spreadsheetData =  converter.fromFile("/home/devbob/Downloads/MarketWatch_12-00-2016.csv",function(err,result){
        //   return result = JSON.stringify(result);
        // });
        // console.log(spreadsheetData);
        // var itc = require("fs").createReadStream("/home/devbob/Downloads/MarketWatch_12-00-2016.csv").pipe(converter);
        // console.log("asgagag " + itc);
        var tabledata = element.all(by.css("#ctl00_ContentPlaceHolder1_grd1"));

        var rows = tabledata.all(by.tagName("tr"));
        var cells = rows.all(by.tagName("td"));
        // console.log("*********************************");
        // console.log(rows.get(1))
        // console.log("*********************************");
        var somedata = rows.map(function(elm,i) {
            // return elm.getText();
            // console.log(rows.get(i).getText())
            // console.log("*********************************");
        // console.log(elm.getText());
        // console.log("*********************************");
        // console.log(i);
        });
        // console.log("*********************************");
        // console.log(typeof rows);
        // console.log("*********************************");
        console.log(expect(rows.get(1).getText()).toEqual("something"));

        // var expectedArr = [];
        var textRows = rows.each(function(row){
            // console.log("********************************************");
            // console.log(expect(row.getText()).toEqual("something"));
            // console.log(typeof row);
            // console.log("********************************************");
            return row.getText();
            // expectedArr.push(row.getText().join(","))

        });

        // expect(textRows).toContain("user");

        var fs = require('fs');

        var csv = require('fast-csv');
        var tArray=[];
        fs.createReadStream('/home/devbob/Downloads/MarketWatch_12-00-2016.csv')
        .pipe(csv())
        .on('data',function(data){
            tArray.push(data.join(","));
            //console.log(tArray.indexOf(data.join(",")));
            //console.log(data)
            //if(tArray.indexOf(data.join(",")) == -1) tArray.push(data.join(","));
            //console.log("Tarray ........... " + tArray);
           // console.log(tArray)
            // for (var property in data) {
            //     if (data.hasOwnProperty(property)) {
            //         console.log("trying ................." + data[property]);
            //     }
            // }
        })
        .on('end',function(data){
            // console.log('Read finished');
            // done();
            // console.log(tArray);
            // expect(tArray).toEqual(somedata);
        });

        var columns = ["Security Code", "Security Name", "Security Group", "Open", "High", "Low", "LTP", "No. of Shares", "raded Total Turnover ( Lac)", "No. of Trades"];
        require("csv-to-array")({
           file: "/home/devbob/Downloads/MarketWatch_12-00-2016.csv",
           columns: columns
        }, function (err, array) {
          // console.log(err || array);
        });

        // expect(somedata).toEqual(itc);
        // var columArrData = "/home/devbob/Downloads/MarketWatch_12-00-2016.csv";
        // var rs = require("fs").createReadStream(columArrData);
        // var result = {}
        // var csvConverter=new Converter();
        // //end_parsed will be emitted once parsing finished 
        // csvConverter.on("end_parsed", function(jsonObj) {
        //     console.log(jsonObj);
        //     var myArray = [];
        //     var cData;
        //     var rData;
        //     var fieldData=[];
        //     for (var key in jsonObj[0]) {
        //         fieldData.push(key);
        //     }
        //     myArray.push(fieldData.join(","));
        //     for(i=0;i<jsonObj.length;i++) {
        //         rData=[];
        //         for(j=0;j<fieldData.length;j++) {
        //             rData.push(jsonObj[i][fieldData[j]])
        //         }
        //         myArray.push(rData.join(","));
        //     }
        //     console.log(myArray)
        //     // console.log("Finished parsing");
        //     done();
        // });
         
        // //record_parsed will be emitted each time a row has been parsed. 
        // csvConverter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
         
        //     for (var key in resultRow) {
        //         if (!result[key] || !result[key] instanceof Array) {
        //             result[key] = [];
        //         }
        //         result[key][rowIndex] = resultRow[key];
        //     }
         
        // });
        // rs.pipe(csvConverter);

    });
        
});