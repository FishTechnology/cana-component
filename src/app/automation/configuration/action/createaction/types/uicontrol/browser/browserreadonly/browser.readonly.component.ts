import { Component, Input, OnInit } from '@angular/core';
import { ActionDetailModel } from 'src/app/automation/configuration/action/models/ActionDetailModel';

@Component({
  selector: 'app-browser-readonly',
  templateUrl: './browser.readonly.component.html',
  styleUrls: ['./browser.readonly.component.scss'],
})
export class BrowserReadonlyComponent implements OnInit {
  @Input() actionDetailModel!: ActionDetailModel;
  constructor() {}

  ngOnInit(): void {}
}
