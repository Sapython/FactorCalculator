import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  preloaderVisible: boolean = true;
  constructor() {}
  ngOnInit(): void {
    setTimeout(() => {
      this.preloaderVisible = false;
    }, 1500);
  }
}
