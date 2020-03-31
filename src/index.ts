import fs from 'fs';

const matches = fs
	.readFileSync('epl_2018_19.csv', {
		encoding: 'utf-8',
	})
	.split('\n')
	.map((row: string): string[] => {
		return row.split(',');
  });

enum MatchResults {
  HomeWin = 'H',
  AwayWin = 'A',
  Draw = 'D'
}

let checlseaWins: number = 0;

for (let match of matches) {
	if (match[1] === 'Chelsea' && match[5] === MatchResults.HomeWin) {
		checlseaWins += 1;
	} else if (match[2] === 'Chelsea' && match[5] === MatchResults.AwayWin) {
		checlseaWins += 1;
	}
}

console.log(
	`In the English Premier League of 2018/19 season, Chelsea won ${checlseaWins} matches!`,
);
