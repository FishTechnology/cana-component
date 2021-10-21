import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CreateActionComponent } from './createaction/createaction.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  testPlanId: number;
  testCaseId: number;
  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.testCaseId = params['testcaseid'];
      this.testPlanId = params['testplanid'];
    });
  }

  ngOnInit(): void {}

  refresh(): void {}

  createAction(): void {
    this.dialog.open(CreateActionComponent);
  }
}
