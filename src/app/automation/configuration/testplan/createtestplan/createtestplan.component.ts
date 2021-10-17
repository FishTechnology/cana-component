import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { TestplanService } from '../testplan.service';

@Component({
  selector: 'app-createtestplan',
  templateUrl: './createtestplan.component.html',
  styleUrls: ['./createtestplan.component.scss'],
})
export class CreateTestplanComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  testplanform: FormGroup;
  customerDetail: CustomerDetail;
  constructor(
    private testplanService: TestplanService,
    private _snackBar: MatSnackBar
  ) {
    this.testplanform = new FormGroup({
      name: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  createTestplan(): void {}

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
