import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SelectModel } from '../../../../../../../commons/models/SelectModel';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ControlContainer, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit {
  @ViewChild('ctlOptionInput') ctlOptionInput!: ElementRef<HTMLInputElement>;
  @Input() formCtlGroup!: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredKeyOptions!: Observable<SelectModel[]>;
  keyOptions: SelectModel[] = [];
  Keys: SelectModel[] = [];
  allKeyOptions: SelectModel[] = [
    { text: 'Null', value: 'NULL' },
    { text: 'Cancel', value: 'CANCEL' },
    { text: 'Help', value: 'HELP' },
    { text: 'Back Space', value: 'BACK_SPACE' },
    { text: 'Tab', value: 'TAB' },
    { text: 'Clear', value: 'CLEAR' },
    { text: 'Return', value: 'RETURN' },
    { text: 'Enter', value: 'ENTER' },
    { text: 'Shift', value: 'SHIFT' },
    { text: 'Left Shift', value: 'LEFT_SHIFT' },
    { text: 'Control', value: 'CONTROL' },
    { text: 'Left Control', value: 'LEFT_CONTROL' },
    { text: 'Alt', value: 'ALT' },
    { text: 'Left Alt', value: 'LEFT_ALT' },
    { text: 'Pause', value: 'PAUSE' },
    { text: 'Escape', value: 'ESCAPE' },
    { text: 'Space', value: 'SPACE' },
    { text: 'Page Up', value: 'PAGE_UP' },
    { text: 'Page Down', value: 'PAGE_DOWN' },
    { text: 'End', value: 'END' },
    { text: 'Home', value: 'HOME' },
    { text: 'Left', value: 'LEFT' },
    { text: 'Arrow Left', value: 'ARROW_LEFT' },
    { text: 'Up', value: 'UP' },
    { text: 'Arrow Up', value: 'ARROW_UP' },
    { text: 'Right', value: 'RIGHT' },
    { text: 'Arrow Right', value: 'ARROW_RIGHT' },
    { text: 'Down', value: 'DOWN' },
    { text: 'Arrow Down', value: 'ARROW_DOWN' },
    { text: 'Insert', value: 'INSERT' },
    { text: 'Delete', value: 'DELETE' },
    { text: 'Semi Colon', value: 'SEMICOLON' },
    { text: 'Equals', value: 'EQUALS' },
    { text: 'Num pad0', value: 'NUMPAD0' },
    { text: 'Num pad1', value: 'NUMPAD1' },
    { text: 'Num pad2', value: 'NUMPAD2' },
    { text: 'Num pad3', value: 'NUMPAD3' },
    { text: 'Num pad4', value: 'NUMPAD4' },
    { text: 'Num pad5', value: 'NUMPAD5' },
    { text: 'Num pad6', value: 'NUMPAD6' },
    { text: 'Num pad7', value: 'NUMPAD7' },
    { text: 'Num pad8', value: 'NUMPAD8' },
    { text: 'Num pad9', value: 'NUMPAD9' },
    { text: 'Multiply', value: 'MULTIPLY' },
    { text: 'Add', value: 'ADD' },
    { text: 'Separator', value: 'SEPARATOR' },
    { text: 'Subtract', value: 'SUBTRACT' },
    { text: 'Decimal', value: 'DECIMAL' },
    { text: 'Divide', value: 'DIVIDE' },
    { text: 'F1', value: 'F1' },
    { text: 'F2', value: 'F2' },
    { text: 'F3', value: 'F3' },
    { text: 'F4', value: 'F4' },
    { text: 'F5', value: 'F5' },
    { text: 'F6', value: 'F6' },
    { text: 'F7', value: 'F7' },
    { text: 'F8', value: 'F8' },
    { text: 'F9', value: 'F9' },
    { text: 'F10', value: 'F10' },
    { text: 'F11', value: 'F11' },
    { text: 'F12', value: 'F12' },
    { text: 'Meta', value: 'META' },
    { text: 'Command', value: 'COMMAND' },
    { text: 'Zenkaku Hankaku', value: 'ZENKAKU_HANKAKU' }
  ];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.formCtlGroup = this.controlContainer.control as FormGroup;
    this.filteredKeyOptions = this.formCtlGroup
      .get('eventOption')!
      .valueChanges.pipe(
        startWith(null),
        map((key: SelectModel | null) =>
          key ? this._filter(key) : this.allKeyOptions.slice()
        )
      );
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

  remove(key: SelectModel): void {
    const index = this.Keys.indexOf(key);

    if (index >= 0) {
      this.Keys.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.uiControlFormOption().push(
      this.newUiControlOption(event.option.value)
    );
    this.keyOptions.push(event.option.value);
    this.ctlOptionInput.nativeElement.value = '';
    this.formCtlGroup.get('eventOption')!.setValue(null);
  }

  private _filter(value: SelectModel): SelectModel[] {
    let filterValue = '';
    if (value.value) {
      filterValue = value.value.toLowerCase();
    } else {
      filterValue = (value as unknown as string).toLowerCase();
    }

    return this.allKeyOptions.filter((ctlOption) =>
      ctlOption.value.toLowerCase().includes(filterValue)
    );
  }

  uiControlFormOption(): FormArray {
    return this.formCtlGroup.get('uiControlFormOptions') as FormArray;
  }

  newUiControlOption(selectionModel: SelectModel): FormGroup {
    return new FormGroup({
      optionType: new FormControl(selectionModel.value),
      conditionType: new FormControl('', Validators.required),
      duration: new FormControl('4'),
      value: new FormControl(),
      assertType: new FormControl(),
    });
  }

}
