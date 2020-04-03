import { MatchData } from "./MatchData";

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  run(print: string): void;
}

export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}
}
