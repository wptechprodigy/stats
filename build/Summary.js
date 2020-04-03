"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Summary = /** @class */ (function () {
    function Summary(analyzer, outputTarget) {
        this.analyzer = analyzer;
        this.outputTarget = outputTarget;
    }
    Summary.prototype.buildAndPrintReport = function (matches) {
        var analysisOutput = this.analyzer.run(matches);
        this.outputTarget.print(analysisOutput);
    };
    return Summary;
}());
exports.Summary = Summary;
