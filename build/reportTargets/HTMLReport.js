"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var HTMLReport = /** @class */ (function () {
    function HTMLReport(reportName) {
        this.reportName = reportName;
    }
    HTMLReport.prototype.print = function (report) {
        var html = "\n      <div>\n        <h1>Analysis Report</h1>\n        <h3>" + report + "</h3>\n      </div>\n    ";
        fs_1.default.writeFileSync(this.reportName, html);
    };
    return HTMLReport;
}());
exports.HTMLReport = HTMLReport;
