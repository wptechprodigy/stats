"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CsvFileReader_1 = require("./CsvFileReader");
var matchResult_1 = require("./matchResult");
var reader = new CsvFileReader_1.CsvFileReader('epl_2018_19.csv');
reader.read();
var checlseaWins = 0;
for (var _i = 0, _a = reader.data; _i < _a.length; _i++) {
    var match = _a[_i];
    if (match[1] === 'Chelsea' && match[5] === matchResult_1.MatchResults.HomeWin) {
        checlseaWins += 1;
    }
    else if (match[2] === 'Chelsea' && match[5] === matchResult_1.MatchResults.AwayWin) {
        checlseaWins += 1;
    }
}
console.log("In the English Premier League of 2018/19 season, Chelsea won " + checlseaWins + " matches!");
