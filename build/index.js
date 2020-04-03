"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_1 = require("./MatchReader");
var Summary_1 = require("./Summary");
var matchReader = MatchReader_1.MatchReader.fromSource('epl_2018_19.csv');
var summary = Summary_1.Summary.winsAnalysisWithConsoleReport('Arsenal');
// const summary = Summary.winsAnalysisWithHtmlReport('Man United');
// Call the load method to populate the matches property of the reader
matchReader.load();
summary.buildAndPrintReport(matchReader.matches);
