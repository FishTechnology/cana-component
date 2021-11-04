import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { UploadService } from 'src/app/commons/upload/upload.service';
import { SelectModel } from '../../../../commons/SelectModel';
import { GlobalvariableService } from '../globalvariable.service';
import { CreateGlobalVariableModel } from '../models/CreateGlobalVariableModel';
import { GlobalVariableType } from '../models/GlobalVariableType';
import { UpdateGlobalVariableModel } from '../models/UpdateGlobalVariableModel';

@Component({
  selector: 'app-createglobalvariable',
  templateUrl: './createglobalvariable.component.html',
  styleUrls: ['./createglobalvariable.component.scss'],
})
export class CreateGlobalVariableComponent implements OnInit {
  @Output() globalVariableEvent = new EventEmitter<string>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  globalValueTypes: SelectModel[] = [
    { text: 'Text', value: GlobalVariableType.Text.toString() },
    { text: 'File', value: GlobalVariableType.File.toString() },
  ];
  globalvariableform: FormGroup;
  files: File[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { customerDetail: CustomerDetail; globalVariableId: number },
    private globalVariableService: GlobalvariableService,
    private dialogRef: MatDialogRef<CreateGlobalVariableComponent>,
    private snackbarService: SnackbarService,
    private uploadService: UploadService
  ) {
    this.globalvariableform = new FormGroup({
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      valueType: new FormControl(GlobalVariableType.Text.toString()),
      comments: new FormControl(''),
    });
    if (this.data.globalVariableId) {
      this.globalVariableService
        .getGlobalVariableById(this.data.globalVariableId)
        .subscribe((res) => {
          this.globalvariableform.get('key')?.setValue(res.key);
          this.globalvariableform.get('value')?.setValue(res.value);
          this.globalvariableform
            .get('valueType')
            ?.setValue(res.valueType.toLowerCase());
          this.globalvariableform.get('comments')?.setValue(res.comments);
        });
    }
  }

  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  async create(): Promise<void> {
    if (this.data.globalVariableId) {
      return this.updateGlobalVariable();
    }

    if (
      this.globalvariableform.get('valueType')?.value ===
        GlobalVariableType.File.toString() &&
      this.files.length >= 1
    ) {
      return this.updateLoadFile();
    }

    this.createGlobalVariable(0);
  }

  createGlobalVariable(fileId: number): void {
    let createGlobalVariable: CreateGlobalVariableModel = {
      key: this.globalvariableform.get('key')?.value,
      value: this.globalvariableform.get('value')?.value,
      valueType: this.globalvariableform.get('valueType')?.value,
      comments: this.globalvariableform.get('comments')?.value,
      userId: this.data.customerDetail.userId,
    };

    if (fileId !== 0) {
      createGlobalVariable.fileId = fileId;
    }

    this.globalVariableService
      .createGlobalVariable(createGlobalVariable)
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfully created global variable'
          );
          this.globalVariableEvent.emit('success');
          this.dialogRef.close();
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while creating global variable'
          );
        }
      );
  }

  updateLoadFile(): void {
    var formData = new FormData();
    formData.append('file', this.files[0]);
    formData.append('fileName', this.files[0].name);
    formData.append('type', this.files[0].type);
    formData.append('size', this.files[0].size.toString());
    formData.append('userId', this.data.customerDetail.userId);

    this.uploadService.uploadFile(formData).subscribe(
      (res) => {
        let upload = res;
        this.createGlobalVariable(parseInt(res.id));
      },
      (err) => {
        this.snackbarService.openSnackBar('Error while uploading file');
      }
    );
  }

  updateGlobalVariable(): void {
    let updateGlobalVariableModel: UpdateGlobalVariableModel = {
      key: this.globalvariableform.get('key')?.value,
      value: this.globalvariableform.get('value')?.value,
      valueType: this.globalvariableform.get('valueType')?.value,
      comments: this.globalvariableform.get('comments')?.value,
      userId: this.data.customerDetail.userId,
    };
    if (this.files.length >= 1) {
      const formData = new FormData();
      formData.append('file', this.files[0]);
      updateGlobalVariableModel.file = formData;
      updateGlobalVariableModel.value = this.files[0].name;
    }

    this.globalVariableService
      .updateGlobalVariable(
        this.data.globalVariableId,
        updateGlobalVariableModel
      )
      .subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'successfully updated global variable'
          );
          this.globalVariableEvent.emit('success');
          this.dialogRef.close();
        },
        (err) => {
          this.snackbarService.openSnackBar(
            'error while update global variable'
          );
        }
      );
  }
}
