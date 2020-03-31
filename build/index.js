"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var matches = fs_1.default
    .readFileSync('epl_2018_19.csv', {
    encoding: 'utf-8',
})
    .split('\n')
    .map(function (row) {
    return row.split(',');
});
var homeWin = 'H';
var awayWin = 'A';
var checlseaWins = 0;
for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
    var match = matches_1[_i];
    if (match[1] === 'Chelsea' && match[5] === homeWin) {
        checlseaWins += 1;
    }
    else if (match[2] === 'Chelsea' && match[5] === awayWin) {
        checlseaWins += 1;
    }
}
console.log("In the English Premier League of 2018/19 season, Chelsea won " + checlseaWins + " matches!");
