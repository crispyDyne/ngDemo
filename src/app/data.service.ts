import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data = ['First piece of default Data', 'Second piece of default data'];

  constructor() {}
}
