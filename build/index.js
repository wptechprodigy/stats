"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchResult_1 = require("./matchResult");
var MatchReader_1 = require("./MatchReader");
var CsvFileReader_1 = require("./CsvFileReader");
// Create an object that satisfies the DataReader interface
var csvFileReader = new CsvFileReader_1.CsvFileReader('epl_2018_19.csv');
// Create an instance of MatchReader and pass in something satisfying
// the DataReader interface
var matchReader = new MatchReader_1.MatchReader(csvFileReader);
// Call the load method to populate the matches property of the reader
matchReader.load();
var checlseaWins = 0;
for (var _i = 0, _a = matchReader.matches; _i < _a.length; _i++) {
    var match = _a[_i];
    if (match[1] === 'Chelsea' && match[5] === matchResult_1.MatchResults.HomeWin) {
        checlseaWins += 1;
    }
    else if (match[2] === 'Chelsea' && match[5] === matchResult_1.MatchResults.AwayWin) {
        checlseaWins += 1;
    }
}
console.log("In the English Premier League of 2018/19 season, Chelsea won " + checlseaWins + " matches!");
