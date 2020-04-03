import { MatchResults } from './matchResult';
import { MatchReader } from './MatchReader';
import { CsvFileReader } from './CsvFileReader';

// Create an object that satisfies the DataReader interface
const csvFileReader = new CsvFileReader('epl_2018_19.csv');

// Create an instance of MatchReader and pass in something satisfying
// the DataReader interface
const matchReader = new MatchReader(csvFileReader);

// Call the load method to populate the matches property of the reader
matchReader.load();


let checlseaWins: number = 0;

for (let match of matchReader.matches) {
	if (match[1] === 'Chelsea' && match[5] === MatchResults.HomeWin) {
		checlseaWins += 1;
	} else if (match[2] === 'Chelsea' && match[5] === MatchResults.AwayWin) {
		checlseaWins += 1;
	}
}

console.log(
	`In the English Premier League of 2018/19 season, Chelsea won ${checlseaWins} matches!`,
);
