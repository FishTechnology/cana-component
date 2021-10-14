import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SelectModel } from '../../../../commons/SelectModel';
import { GlobalvariableService } from '../globalvariable.service';
import { CreateGlobalVariable } from '../models/CreateGlobalVariableModel';

@Component({
  selector: 'app-createglobalvariable',
  templateUrl: './createglobalvariable.component.html',
  styleUrls: ['./createglobalvariable.component.scss'],
})
export class CreateGlobalVariableComponent implements OnInit {
  globalValueTypes: SelectModel[];
  globalvariableform: FormGroup;
  files: File[] = [];
  customerDetail: CustomerDetail;

  constructor(private globalvariableService: GlobalvariableService) {
    this.globalvariableform = new FormGroup({
      key: new FormControl(''),
      value: new FormControl(''),
      valueType: new FormControl('keyandvalue'),
      comments: new FormControl('comments'),
    });
  }

  ngOnInit(): void {
    this.globalValueTypes = [
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
    let createGlobalVariable: CreateGlobalVariable = {
      key: this.globalvariableform.get('key').value,
      value: this.globalvariableform.get('value').value,
      valueType: this.globalvariableform.get('valueType').value,
      comments: this.globalvariableform.get('comments').value,
      userid: this.customerDetail.userId,
    };
    this.globalvariableService
      .createGlobalVariable(createGlobalVariable)
      .subscribe((res) => {});
  }
}
