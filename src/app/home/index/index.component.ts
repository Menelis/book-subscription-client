import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public homeText: string = '';
  constructor() {
    this.homeText = "WELCOME TO BOOK-SUBSCRIPTION APPLICATION."
  }

  ngOnInit(): void {
  }

}
