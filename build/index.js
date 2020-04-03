"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_1 = require("./MatchReader");
var CsvFileReader_1 = require("./CsvFileReader");
var Summary_1 = require("./Summary");
var WinsAnalysis_1 = require("./analyzers/WinsAnalysis");
var ConsoleReports_1 = require("./reportTargets/ConsoleReports");
// Create an object that satisfies the DataReader interface
var csvFileReader = new CsvFileReader_1.CsvFileReader('epl_2018_19.csv');
// Create an instance of MatchReader and pass in something satisfying
// the DataReader interface
var matchReader = new MatchReader_1.MatchReader(csvFileReader);
// Call the load method to populate the matches property of the reader
matchReader.load();
var summary = new Summary_1.Summary(new WinsAnalysis_1.WinsAnalysis('Arsenal'), new ConsoleReports_1.ConsoleReport());
summary.buildAndPrintReport(matchReader.matches);
