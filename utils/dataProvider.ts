import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {
  static getTestDataFromJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  static getTestDataFromCsv(filePath: string) {
    const data = fs.readFileSync(filePath);
    return parse(data, {
      columns: true,
      skip_empty_lines: true
    });
  }
}