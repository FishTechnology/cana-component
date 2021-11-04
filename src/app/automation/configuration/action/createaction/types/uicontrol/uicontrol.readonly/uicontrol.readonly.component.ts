import { Component, Input, OnInit } from '@angular/core';
import { ActionDetailModel } from '../../../../models/ActionDetailModel';

@Component({
  selector: 'app-uicontrol-readonly',
  templateUrl: './uicontrol.readonly.component.html',
  styleUrls: ['./uicontrol.readonly.component.scss'],
})
export class UiControlReadonlyComponent implements OnInit {
  @Input() actionDetailModel!: ActionDetailModel;
  constructor() {}

  ngOnInit(): void {}
}
