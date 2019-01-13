import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ved',
  templateUrl: './ved.component.html',
  styleUrls: ['./ved.component.css']
})
export class VedComponent implements OnInit {

  constructor(
  	 private location: Location
  	) { }

  ngOnInit() {
  }

 	/**
    * [goBack обработка нажатия кнопки "Назад"]
    */
    goBack(): void {
        this.location.back();
    }
}
