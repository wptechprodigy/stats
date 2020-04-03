import { MatchReader } from './MatchReader';
import { CsvFileReader } from './CsvFileReader';
import { Summary } from './Summary';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reportTargets/ConsoleReports';

// Create an object that satisfies the DataReader interface
const csvFileReader = new CsvFileReader('epl_2018_19.csv');

// Create an instance of MatchReader and pass in something satisfying
// the DataReader interface
const matchReader = new MatchReader(csvFileReader);

// Call the load method to populate the matches property of the reader
matchReader.load();

const summary = new Summary(
	new WinsAnalysis('Arsenal'),
	new ConsoleReport()
);

summary.buildAndPrintReport(matchReader.matches);
