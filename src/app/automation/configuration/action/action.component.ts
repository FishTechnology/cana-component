import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ActionService } from './action.service';
import { ActionDetailModel } from './models/ActionDetailModel';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  testPlanId!: number;
  testCaseId!: number;
  actionDetailModels!: ActionDetailModel[];

  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    private actionService: ActionService
  ) {
    this.route.params.subscribe((params) => {
      this.testCaseId = params['testcaseid'];
      this.testPlanId = params['testplanid'];
      this.getActionByTestCaseId();
    });
  }

  ngOnInit(): void {}

  refresh(): void {
    this.getActionByTestCaseId();
  }

  navigateToActionCreation(): void {
    let url = `/configuration/testcases/${this.testCaseId}/actions/create`;
    if (this.testPlanId) {
      url = `/configuration/testplans/${this.testPlanId}/testcases/${this.testCaseId}/actions/create`;
    }
    this.router.navigate([url]);
  }

  navigateToActionEdit(): void {
    let url = `/configuration/testplans/${this.testPlanId}/testcases/${this.testCaseId}/actions/edit`;
    if (this.testPlanId) {
      url = `/configuration/testcases/${this.testCaseId}/actions/edit`;
    }
    this.router.navigate([url]);
  }

  getActionByTestCaseId(): void {
    this.actionService
      .getActionByTestCaseId(this.testCaseId)
      .subscribe((res) => {
        this.actionDetailModels = res;
      });
  }
}
