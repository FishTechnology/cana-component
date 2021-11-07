import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/commons/error/MyErrorStateMatcher';
import { SelectModel } from 'src/app/commons/SelectModel';
import { BrowserActionType } from './models/BrowserActionType';

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
    this.setBrowserActionTypes();

    this.uiControlForm
      .get('isAssertVerification')
      ?.valueChanges.subscribe((data) => {
        this.setBrowserActionTypes();
      });
  }

  setBrowserActionTypes(): void {
    if (this.uiControlForm.get('isAssertVerification')?.value) {
      this.browserActionTypes = [
        { text: 'Title', value: BrowserActionType.Title },
        { text: 'Url', value: BrowserActionType.Url },
      ];
    } else {
      this.browserActionTypes = [
        { text: 'Open', value: BrowserActionType.Open },
        { text: 'Close', value: BrowserActionType.Close },
      ];
    }
  }
}
