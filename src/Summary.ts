import { MatchData } from './MatchData';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { HTMLReport } from './reportTargets/HTMLReport';
import { ConsoleReport } from './reportTargets/ConsoleReports';

export interface Analyzer {
	run(matches: MatchData[]): string;
}

export interface OutputTarget {
	print(report: string): void;
}

export class Summary {
	static winsAnalysisWithHtmlReport(team: string): Summary {
		return new Summary(
			new WinsAnalysis(team),
			new HTMLReport('analysisReport.html'),
		);
	}

	static winsAnalysisWithConsoleReport(team: string): Summary {
    return new Summary(
      new WinsAnalysis(team),
      new ConsoleReport()
    )
  }

	constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

	buildAndPrintReport(matches: MatchData[]): void {
		const analysisOutput = this.analyzer.run(matches);
		this.outputTarget.print(analysisOutput);
	}
}
