import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit {
  @Input() actionType: string | undefined;
  @Input() isAssertVerification!: string;

  constructor() {}

  ngOnInit(): void {}
}
