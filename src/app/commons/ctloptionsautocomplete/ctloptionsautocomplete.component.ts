import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { UiControlOptoinType } from 'src/app/automation/configuration/action/createaction/types/uicontrol/models/UiControlOptoinType';

import { map, startWith } from 'rxjs/operators';
import { SelectModel } from '../models/SelectModel';

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
  allCtlOptions: SelectModel[] = [
    { text: 'Wait', value: UiControlOptoinType.WAIT },
    { text: 'Wait For Visible', value: UiControlOptoinType.WAIT_FOR_VISIBLE },
    { text: 'Optional', value: UiControlOptoinType.OPTIONAL },
    { text: 'Contains', value: UiControlOptoinType.CONTAINS },
    { text: 'Size', value: UiControlOptoinType.SIZE },
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
      //this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.formCtlGroup.get('eventOption')!.setValue(null);
  }

  deleteControlOption(selectModel: SelectModel, index: number): void {
    this.ctlOptions.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    let name = '';
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
      waitinseconds: new FormControl(''),
      optionType: new FormControl(selectionModel.value),
    });
  }
}
