"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinsAnalysis_1 = require("./analyzers/WinsAnalysis");
var HTMLReport_1 = require("./reportTargets/HTMLReport");
var ConsoleReports_1 = require("./reportTargets/ConsoleReports");
var Summary = /** @class */ (function () {
    function Summary(analyzer, outputTarget) {
        this.analyzer = analyzer;
        this.outputTarget = outputTarget;
    }
    Summary.winsAnalysisWithHtmlReport = function (team) {
        return new Summary(new WinsAnalysis_1.WinsAnalysis(team), new HTMLReport_1.HTMLReport('analysisReport.html'));
    };
    Summary.winsAnalysisWithConsoleReport = function (team) {
        return new Summary(new WinsAnalysis_1.WinsAnalysis(team), new ConsoleReports_1.ConsoleReport());
    };
    Summary.prototype.buildAndPrintReport = function (matches) {
        var analysisOutput = this.analyzer.run(matches);
        this.outputTarget.print(analysisOutput);
    };
    return Summary;
}());
exports.Summary = Summary;
