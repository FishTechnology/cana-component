import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/commons/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ActionType } from './models/ActionTypes';

@Component({
  selector: 'app-createaction',
  templateUrl: './createaction.component.html',
  styleUrls: ['./createaction.component.scss'],
})
export class CreateActionComponent implements OnInit {
  testPlanId!: number;
  testCaseId!: number;
  actionTypes!: SelectModel[];
  actionform: FormGroup;

  constructor(private snackbarService: SnackbarService) {
    this.actionform = new FormGroup({
      actionType: new FormControl('uicontrol', Validators.required),
    });
  }

  ngOnInit(): void {
    this.actionTypes = [
      {
        text: 'UI Control',
        value: 'uicontrol',
      },
      {
        text: 'Api',
        value: 'api',
      },
      {
        text: 'DataBase',
        value: 'database',
      },
    ];
  }
}
