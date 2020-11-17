import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const defaultData = [
  'First piece of default Data',
  'Second piece of default data',
];
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // tslint:disable-next-line: variable-name
  private _data: BehaviorSubject<string[]> = new BehaviorSubject(defaultData);
  public readonly data: Observable<string[]> = this._data.asObservable();
  constructor() {}

  addData(newData): void {
    const data = this._data.getValue();
    this._data.next([...data, newData]);
  }
}
