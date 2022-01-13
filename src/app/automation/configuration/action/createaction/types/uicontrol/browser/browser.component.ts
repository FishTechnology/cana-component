import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/commons/error/MyErrorStateMatcher';
import { SelectModel } from 'src/app/commons/SelectModel';
import { BrowserActionType } from './models/BrowserActionType';
import { conditionType } from './models/ConditionType';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss'],
})
export class BrowserComponent implements OnInit {
  uiControlForm!: FormGroup;
  browserForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  isAssertVerification: boolean = false;
  browserActionTypes: SelectModel[] = [
    { text: 'Open', value: BrowserActionType.Open },
    { text: 'Close', value: BrowserActionType.Close },
    { text: 'Navigation', value: BrowserActionType.Navigation },
  ];
  conditionTypes: SelectModel[] = [
    { text: 'Equal', value: conditionType.Equal },
    { text: 'Not Equal', value: conditionType.Not_Equal },
    { text: 'Contains', value: conditionType.Contains },
    { text: 'Start With', value: conditionType.Start_With },
    { text: 'End With', value: conditionType.End_With },
  ];

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.uiControlForm = this.controlContainer.control as FormGroup;
    this.browserForm = this.uiControlForm.get('browserDetail') as FormGroup;

    this.setBrowserActionTypes();

    this.uiControlForm
      .get('isAssertVerification')
      ?.valueChanges.subscribe((data: boolean) => {
        this.isAssertVerification = data;
        this.setBrowserActionTypes();
      });
  }

  setBrowserActionTypes(): void {
    if (this.isAssertVerification) {
      this.browserActionTypes = [
        { text: 'Title', value: BrowserActionType.Title },
        { text: 'Url', value: BrowserActionType.Url },
      ];
    } else {
      this.browserActionTypes = [
        { text: 'Open', value: BrowserActionType.Open },
        { text: 'Close', value: BrowserActionType.Close },
        { text: 'Navigation', value: BrowserActionType.Navigation },
      ];
    }
  }
}
