import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { EnvironmentVariableService } from '../environmentvariable.service';
import { CreateEnvironmentVariableModel } from '../models/CreateEnvironmentVariableModel';

@Component({
  selector: 'app-createenvironmentvariable',
  templateUrl: './createenvironmentvariable.component.html',
  styleUrls: ['./createenvironmentvariable.component.scss'],
})
export class CreateEnvironmentVariableComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  environmentValueTypes: SelectModel[];
  environmentVariableForm: FormGroup;
  files: File[] = [];
  customerDetail: CustomerDetail;
  constructor(
    private environmentVariableService: EnvironmentVariableService,
    private _snackBar: MatSnackBar
  ) {
    this.environmentVariableForm = new FormGroup({
      key: new FormControl(''),
      value: new FormControl(''),
      valueType: new FormControl('keyandvalue'),
      comments: new FormControl(''),
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
  createGlobalVariable() {
    // let createGlobalVariable: CreateEnvironmentVariableModel = {
    //   key: this.globalvariableform.get('key').value,
    //   value: this.globalvariableform.get('value').value,
    //   valueType: this.globalvariableform.get('valueType').value,
    //   comments: this.globalvariableform.get('comments').value,
    //   userid: this.customerDetail.userId,
    // };
    // this.globalvariableService
    //   .createGlobalVariable(createGlobalVariable)
    //   .subscribe((res) => {
    //     this.openSnackBar('successfully created global variables');
    //   });
  }

  openSnackBar(message: string, closeText: string = 'Close'): void {
    this._snackBar.open(message, closeText, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
