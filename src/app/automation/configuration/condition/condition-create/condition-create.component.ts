import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/commons/SelectModel';
import { Conditions } from '../models/conditions';
import { VariableTypes } from '../models/variable-type';

@Component({
  selector: 'app-condition-create',
  templateUrl: './condition-create.component.html',
  styleUrls: ['./condition-create.component.scss'],
})
export class ConditionCreateComponent implements OnInit {
  conditionForm: FormGroup;
  variableTypeModels!: SelectModel[];
  conditionTypeModels: SelectModel[];
  conditionNameModels: SelectModel[];
  isDisableValue: boolean = false;
  constructor() {
    this.conditionForm = new FormGroup({
      variableType: new FormControl('', Validators.required),
      value: new FormControl(''),
      rules: new FormArray([]),
    });
    this.variableTypeModels = [
      {
        text: 'Globale Variable',
        value: VariableTypes.GLOBALE_VARIABLE.toString(),
      },
      {
        text: 'Environment Variable',
        value: VariableTypes.ENVIRONMENT_VARIABLE.toString(),
      },
    ];

    this.conditionTypeModels = [
      {
        text: 'Less than',
        value: Conditions.Less_than.toString(),
      },
      {
        text: 'Greater than',
        value: Conditions.Greater_Than.toString(),
      },
      {
        text: 'Less than or Equal to',
        value: Conditions.Less_than_or_Equal_to.toString(),
      },
      {
        text: 'Greater than or Equal to',
        value: Conditions.Greater_than_or_Equal_to.toString(),
      },
      {
        text: 'Equal to',
        value: Conditions.Equal_to.toString(),
      },
      {
        text: 'Not contain',
        value: Conditions.Not_contain.toString(),
      },
      {
        text: 'Contains',
        value: Conditions.Contains.toString(),
      },
      {
        text: 'Reset',
        value: Conditions.Reset.toString(),
      },
    ];

    this.conditionNameModels = [
      {
        text: 'Environment',
        value: Conditions.Less_than.toString(),
      },
    ];
  }

  ngOnInit(): void {}
}
