import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { SelectModel } from 'src/app/commons/SelectModel';
import { ErrorStateMatcher } from '@angular/material/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-uicontrol',
  templateUrl: './uicontrol.component.html',
  styleUrls: ['./uicontrol.component.scss'],
})
export class UicontrolComponent implements OnInit {
  @Input() actionType: string | undefined;
  @ViewChild('optionInput') optionInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredUIControlOptions: Observable<string[]>;
  uiControlOptions: string[] = ['Lemon'];
  allUIControlOptions: string[] = [
    'Wait Until Element Visible',
    'Lemon',
    'Lime',
    'Orange',
    'Strawberry',
  ];
  uiControlForm: FormGroup;
  uiCtlActionTypes: SelectModel[];
  matcher = new MyErrorStateMatcher();

  constructor() {
    this.uiControlForm = new FormGroup({
      type: new FormControl('', Validators.required),
    });
    this.uiControlForm = new FormGroup({
      uiactionType: new FormControl('input', Validators.required),
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      eventOption: new FormControl(''),
    });
    this.uiCtlActionTypes = [
      { text: 'Input', value: 'input' },
      { text: 'Click', value: 'click' },
    ];
    this.filteredUIControlOptions = of(this.allUIControlOptions);
    // this.filteredUIControlOptions = this.uiControlForm
    //   .get('eventOption')
    //   .valueChanges.pipe(startWith(null), map((uiControlOption: string | null)=> uiControlOption ? this._filter()));
  }

  ngOnInit(): void {}

  remove(uiControlOption: string): void {
    const index = this.uiControlOptions.indexOf(uiControlOption);

    if (index >= 0) {
      this.uiControlOptions.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.uiControlOptions.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();

    this.uiControlForm.get('eventOption')!.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.uiControlOptions.push(event.option.viewValue);
    //this.optionInput.nativeElement.value = '';
    this.uiControlForm.get('eventOption')!.setValue(null);
  }
}
