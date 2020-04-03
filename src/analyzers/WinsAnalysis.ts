import { MatchData } from "../MatchData";
import { Analyzer } from "../Summary";
import { MatchResults } from "../matchResult";

export class WinsAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    let wins: number = 0;

		for (let match of matches) {
			if (match[1] === this.team && match[5] === MatchResults.HomeWin) {
				wins += 1;
			} else if (match[2] === this.team && match[5] === MatchResults.AwayWin) {
				wins += 1;
			}
		}

		return `${this.team} won ${wins} matches in the English Premier League of 2018/19 season.`;
  }
}
