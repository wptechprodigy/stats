import { MatchReader } from './MatchReader';
import { Summary } from './Summary';

const matchReader = MatchReader.fromSource('epl_2018_19.csv');
const summary = Summary.winsAnalysisWithConsoleReport('Arsenal');
// const summary = Summary.winsAnalysisWithHtmlReport('Man United');

// Call the load method to populate the matches property of the reader
matchReader.load();
summary.buildAndPrintReport(matchReader.matches);
