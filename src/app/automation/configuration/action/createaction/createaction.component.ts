import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ActionType } from '../models/ActionType';

@Component({
  selector: 'app-createaction',
  templateUrl: './createaction.component.html',
  styleUrls: ['./createaction.component.scss'],
})
export class CreateActionComponent implements OnInit {
  @Input() childUiControl = new EventEmitter<string>();
  testPlanId!: number;
  testCaseId!: number;
  actionTypes!: SelectModel[];
  actionform: FormGroup;
  customerDetail!: CustomerDetail;

  constructor(
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService
  ) {
    this.actionform = new FormGroup({
      actionType: new FormControl(ActionType.UI_Action, Validators.required),
    });
    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
    });
  }

  ngOnInit(): void {
    this.actionTypes = [
      {
        text: 'UI Control',
        value: 'UI_ACTION',
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
  navigateToAction(): void {}
  createAction(): void {
    this.childUiControl.emit('save');
  }
}
