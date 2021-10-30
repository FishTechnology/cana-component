import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
  @Input() actionType: string;

  constructor() {}

  ngOnInit(): void {}
}
