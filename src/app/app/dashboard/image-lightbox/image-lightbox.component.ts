import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.scss'],
})
export class ImageLightboxComponent implements OnInit {
  @Input() image:string = '';
  constructor() { }

  ngOnInit() {}

}
