import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from 'src/app/commons/SelectModel';
import { EnvironmentService } from '../environment.service';
import { CreateEnvironmentModel } from '../models/CreateEnvironmentModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEnvironmentModel } from '../models/UpdateEnvironmentModel';

@Component({
  selector: 'app-createenvironment',
  templateUrl: './createenvironment.component.html',
  styleUrls: ['./createenvironment.component.scss'],
})
export class CreateEnvironmentComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  environmentValueTypes: SelectModel[];
  environmentform: FormGroup;
  files: File[] = [];
  customerDetail: CustomerDetail;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { customerDetail: CustomerDetail; environmentId: number },
    private environmentService: EnvironmentService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateEnvironmentComponent>
  ) {
    this.environmentform = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.customerDetail = this.data.customerDetail;
    if (this.data.environmentId) {
      this.environmentService
        .getEnvironmentById(this.data.environmentId)
        .subscribe((res) => {
          this.environmentform.get('id').setValue(res.id);
          this.environmentform.get('name').setValue(res.name);
          this.environmentform.get('comments').setValue(res.comments);
        });
    }
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
    if (this.environmentform.get('id').value) {
      return this.updateEnvironment();
    }
    let createEnvironment: CreateEnvironmentModel = {
      name: this.environmentform.get('name').value,
      comments: this.environmentform.get('comments').value,
      userId: this.customerDetail.userId.toString(),
    };
    this.environmentService.createEnvironment(createEnvironment).subscribe(
      (res) => {
        this.openSnackBar('successfully created environment');
        this.dialogRef.close();
      },
      (err) => {
        this.openSnackBar('Error in creating environment');
      }
    );
  }

  updateEnvironment(): void {
    let updateEnvironmentModel: UpdateEnvironmentModel = {
      name: this.environmentform.get('name').value,
      comments: this.environmentform.get('comments').value,
      userId: this.customerDetail.userId.toString(),
    };
    this.environmentService
      .updateEnvironment(
        updateEnvironmentModel,
        this.environmentform.get('id').value
      )
      .subscribe(
        (res) => {
          this.openSnackBar('successfully updated environment');
          this.dialogRef.close();
        },
        (err) => {
          this.openSnackBar('Error in update environment');
        }
      );
  }
}
