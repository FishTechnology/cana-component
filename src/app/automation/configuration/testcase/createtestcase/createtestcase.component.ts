import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { TestcaseService } from '../testcase.service';

@Component({
  selector: 'app-createtestcase',
  templateUrl: './createtestcase.component.html',
  styleUrls: ['./createtestcase.component.scss'],
})
export class CreateTestcaseComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  testCaseform: FormGroup;
  files: File[] = [];
  customerDetail: CustomerDetail;
  constructor(
    private testcaseService: TestcaseService,
    private _snackBar: MatSnackBar
  ) {
    this.testCaseform = new FormGroup({
      name: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  createTestCase(): void {}
}
