import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { EnvironmentService } from '../environment.service';

@Component({
  selector: 'app-createenvironment',
  templateUrl: './createenvironment.component.html',
  styleUrls: ['./createenvironment.component.scss'],
})
export class CreateEnvironmentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  environmentValueTypes: SelectModel[];
  environmentform: FormGroup;
  files: File[] = [];
  customerDetail: CustomerDetail;
  constructor(
    private environmentService: EnvironmentService,
    private _snackBar: MatSnackBar
  ) {
    this.environmentform = new FormGroup({
      key: new FormControl(''),
      value: new FormControl(''),
      comments: new FormControl('comments'),
    });
  }

  ngOnInit(): void {
    this.environmentValueTypes = [
      { text: 'Key And Value', value: 'keyandvalue' },
      { text: 'File', value: 'file' },
    ];
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  createEnvironment() {
    // let createEnvironment: CreateEnvironmentModel = {
    //   key: this.environmentform.get('key').value,
    //   value: this.environmentform.get('value').value,
    //   valueType: this.environmentform.get('valueType').value,
    //   comments: this.environmentform.get('comments').value,
    //   userid: this.customerDetail.userId,
    // };
    // this.environmentService
    //   .createGlobalVariable(createGlobalVariable)
    //   .subscribe((res) => {
    //     this.openSnackBar('successfully created global variables');
    //   });
  }
}
