import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SelectModel } from 'src/app/commons/SelectModel';
import { BrowserActionType } from './models/BrowserActionType';

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
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit {
  uiControlForm!: FormGroup;
  browserForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  browserActionTypes: SelectModel[] = [
    { text: 'Open', value: BrowserActionType.Open },
    { text: 'Close', value: BrowserActionType.Close },
  ];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.uiControlForm = this.controlContainer.control as FormGroup;
    this.browserForm = this.uiControlForm.get('browserDetail') as FormGroup;
  }
}
