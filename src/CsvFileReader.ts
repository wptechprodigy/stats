import fs from 'fs';
import { MatchResults } from './matchResult';

type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResults,
  string
]

export abstract class CsvFileReader {
  data: MatchData[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): MatchData;

  read(): void {
    this.data = fs
			.readFileSync(this.filename, {
				encoding: 'utf-8',
			})
			.split('\n')
			.map((row: string): string[] => {
				return row.split(',');
      })
      .map(this.mapRow);
  }
}
