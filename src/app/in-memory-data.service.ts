import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Data } from './data';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const Data = [
        {
            id: 1,
            org_Name: 'Donec Elementum Corporation',
            emp_Name: 'Russell Hall',
            age: 64,
            salary: 8710,
            dept_Name: 'IT'
        },
        {
            id: 2,
            org_Name: 'Egestas Inc.',
            emp_Name: 'Zenia Bird',
            age: 55,
            salary: 1186,
            dept_Name: 'CSE'
        }
    ];
    return { Data };
  }

  generateRandomId(data: Data[]): number {
    return data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 11;
  }
}