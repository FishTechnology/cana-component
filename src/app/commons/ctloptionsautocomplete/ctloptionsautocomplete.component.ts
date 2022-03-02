import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { UiControlOptionType } from 'src/app/automation/configuration/action/createaction/types/uicontrol/models/UiControlOptionType';

import { map, startWith } from 'rxjs/operators';
import { SelectModel } from '../models/SelectModel';
import { UIConditionType } from 'src/app/automation/configuration/action/createaction/types/uicontrol/models/UIConditionType';
import { conditionType } from '../../automation/configuration/action/createaction/types/uicontrol/browser/models/ConditionType';

@Component({
  selector: 'app-ctloptionsautocomplete',
  templateUrl: './ctloptionsautocomplete.component.html',
  styleUrls: ['./ctloptionsautocomplete.component.scss'],
})
export class CtlOptionsAutocompleteComponent implements OnInit {
  @ViewChild('ctlOptionInput') ctlOptionInput!: ElementRef<HTMLInputElement>;
  @Input() formCtlGroup!: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ctlOptions: SelectModel[] = [];
  conditionTypes: SelectModel[] = [
    { text: 'Appear', value: UIConditionType.appear },
    { text: 'Checked', value: UIConditionType.checked },
    { text: 'Disabled', value: UIConditionType.disabled },
    { text: 'Disappear', value: UIConditionType.disappear },
    { text: 'Empty', value: UIConditionType.empty },
    { text: 'Enabled', value: UIConditionType.enabled },
    { text: 'Exist', value: UIConditionType.exist },
    { text: 'Focused', value: UIConditionType.focused },
    { text: 'Hidden', value: UIConditionType.hidden },
    { text: 'Image', value: UIConditionType.image },
    { text: 'Read Only', value: UIConditionType.readonly },
    { text: 'Selected', value: UIConditionType.selected },
  ];

  // conditionTypes: SelectModel[] = [
  //   { text: 'Equal', value: conditionType.Equal },
  //   { text: 'Not Equal', value: conditionType.Not_Equal },
  //   { text: 'Contains', value: conditionType.Contains },
  //   { text: 'Start With', value: conditionType.Start_With },
  //   { text: 'End With', value: conditionType.End_With },
  // ];

  allCtlOptions: SelectModel[] = [
    { text: 'Wait', value: UiControlOptionType.WAIT },
    { text: 'Wait For ', value: UiControlOptionType.WAIT_FOR },
    { text: 'Condition', value: UiControlOptionType.CONDITION },
    { text: 'Size', value: UiControlOptionType.SIZE },
  ];
  filteredCtlOptions!: Observable<SelectModel[]>;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.formCtlGroup = this.controlContainer.control as FormGroup;
    this.filteredCtlOptions = this.formCtlGroup
      .get('eventOption')!
      .valueChanges.pipe(
        startWith(null),
        map((fruit: SelectModel | null) =>
          fruit ? this._filter(fruit) : this.allCtlOptions.slice()
        )
      );
  }

  remove(ctlOption: SelectModel, indexOfElement: number): void {
    this.uiControlFormOption().removeAt(indexOfElement);

    if (indexOfElement >= 0) {
      this.ctlOptions.splice(indexOfElement, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.uiControlFormOption().push(
      this.newUiControlOption(event.option.value)
    );
    this.ctlOptions.push(event.option.value);
    this.ctlOptionInput.nativeElement.value = '';
    this.formCtlGroup.get('eventOption')!.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      // this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.formCtlGroup.get('eventOption')!.setValue(null);
  }

  deleteControlOption(selectModel: SelectModel, index: number): void {
    this.ctlOptions.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    const name = '';
  }
  private _filter(value: SelectModel): SelectModel[] {
    let filterValue = '';
    if (value.value) {
      filterValue = value.value.toLowerCase();
    } else {
      filterValue = (value as unknown as string).toLowerCase();
    }

    return this.allCtlOptions.filter((ctlOption) =>
      ctlOption.value.toLowerCase().includes(filterValue)
    );
  }

  uiControlFormOption(): FormArray {
    return this.formCtlGroup.get('uiControlFormOptions') as FormArray;
  }

  newUiControlOption(selectionModel: SelectModel): FormGroup {
    return new FormGroup({
      waitingSeconds: new FormControl(''),
      optionType: new FormControl(selectionModel.value),
      conditionType: new FormControl('', Validators.required),
      duration: new FormControl('4'),
    });
  }
}
