import { Injectable } from '@angular/core';
import data from '../../../assets/json/mock-data/table-data.json'
@Injectable()
export class TableService {
  readonly tableMockData: Record<string, string>[] = data.tableMockData
}
