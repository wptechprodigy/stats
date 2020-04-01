import { MatchResults } from './matchResult';
import { MatchReader } from './MatchReader';

const reader = new MatchReader('epl_2018_19');

let checlseaWins: number = 0;

for (let match of reader.data) {
	if (match[1] === 'Chelsea' && match[5] === MatchResults.HomeWin) {
		checlseaWins += 1;
	} else if (match[2] === 'Chelsea' && match[5] === MatchResults.AwayWin) {
		checlseaWins += 1;
	}
}

console.log(
	`In the English Premier League of 2018/19 season, Chelsea won ${checlseaWins} matches!`,
);
