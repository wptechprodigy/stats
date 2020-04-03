import fs from 'fs';
import { OutputTarget } from "../Summary";

export class HTMLReport implements OutputTarget {
  constructor(public reportName: string) {}

  print(report: string): void {
    const html = `
      <div>
        <h1>Analysis Report</h1>
        <h3>${report}</h3>
      </div>
    `

    fs.writeFileSync(this.reportName, html);
  }
}
