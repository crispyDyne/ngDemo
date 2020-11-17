import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-widget-a',
  templateUrl: './widget-a.component.html',
  styleUrls: ['./widget-a.component.scss'],
})
export class WidgetAComponent implements OnInit {
  constructor(
    private dataService: DataService // Inject data service into this component
  ) {}

  data$: Observable<string[]>; // declare local data property

  ngOnInit(): void {
    this.data$ = this.dataService.data; // assign data Observable in service to local property
  }
}
