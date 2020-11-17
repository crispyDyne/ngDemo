import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-widget-b',
  templateUrl: './widget-b.component.html',
  styleUrls: ['./widget-b.component.scss'],
})
export class WidgetBComponent implements OnInit {
  constructor(private dataService: DataService) {}

  inputText = 'Something New';
  ngOnInit(): void {}

  onClick(): void {
    if (this.inputText.length > 0) {
      this.dataService.addData(this.inputText); // add text to data array
    }
    this.inputText = ''; // clear the text
  }
}
