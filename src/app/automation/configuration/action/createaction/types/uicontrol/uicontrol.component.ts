import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/commons/models/SelectModel';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map, startWith } from 'rxjs/operators';
import { UiControlService } from './uicontrol.service';
import { CreateActionModel } from './models/CreateActionModel';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { UiControlOptionType } from './models/UiControlOptionType';
import { CreateActionOptionModel } from './models/CreateActionOptionModel';
import { UIControlType } from './models/UIControlType';
import { CreateActionBrowserModel } from './models/CreateActionBrowserModel';
import { MyErrorStateMatcher } from 'src/app/commons/error/MyErrorStateMatcher';
import { UIControlKeyType } from './models/UIControlKeyType';
import { conditionType } from './browser/models/ConditionType';

@Component({
  selector: 'app-uicontrol',
  templateUrl: './uicontrol.component.html',
  styleUrls: ['./uicontrol.component.scss'],
})
export class UicontrolComponent implements OnInit, OnChanges {
  @Input() saveEvent!: EventEmitter<string>;
  @Input() isAssertVerification!: boolean;
  @ViewChild('ctlOptionInput') ctlOptionInput!: ElementRef<HTMLInputElement>;
  @Input() actionType!: string;
  selectable = true;
  removable = true;
  customerDetail!: CustomerDetail;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  uiControlForm: FormGroup;
  filteredCtlOptions: Observable<SelectModel[]>;
  uiActionKeyType: SelectModel[] = [];
  ctlOptions: SelectModel[] = [];
  allCtlOptions: SelectModel[] = [
    { text: 'Wait', value: UiControlOptionType.WAIT },
    { text: 'Wait For Visible', value: UiControlOptionType.CONTROL },
  ];
  uiCtlActionTypes: SelectModel[];
  matcher = new MyErrorStateMatcher();
  uiControlOptions: SelectModel[] = [
    { text: 'Wait', value: UiControlOptionType.WAIT },
    { text: 'Wait For Visible', value: UiControlOptionType.CONTROL },
  ];
  testCaseId!: number;
  testPlanId!: number;
  conditionTypes: SelectModel[] = [
    { text: 'Equal', value: conditionType.Equal },
    { text: 'Not Equal', value: conditionType.Not_Equal },
    { text: 'Contains', value: conditionType.Contains },
    { text: 'Start With', value: conditionType.Start_With },
    { text: 'End With', value: conditionType.End_With },
  ];

  constructor(
    private uiControlService: UiControlService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    public customerService: CustomerService
  ) {
    this.uiControlForm = new FormGroup({
      uiactionType: new FormControl(UIControlType.INPUT, Validators.required),
      keyType: new FormControl(UIControlKeyType.Xpath, Validators.required),
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      eventOption: new FormControl(''),
      comments: new FormControl(''),
      isAssertVerification: new FormControl('false'),
      isOptional: new FormControl(''),
      conditionType: new FormControl(''),
      browserDetail: new FormGroup({
        actionType: new FormControl('', Validators.required),
        value: new FormControl(''),
        comments: new FormControl(''),
        conditionType: new FormControl(''),
      }),
      uiControlFormOptions: new FormArray([]),
    });

    this.uiActionKeyType = [
      { text: 'Id', value: UIControlKeyType.Id },
      { text: 'Css', value: UIControlKeyType.Css },
      { text: 'Xpath', value: UIControlKeyType.Xpath },
    ];

    this.uiCtlActionTypes = [
      { text: 'Input', value: UIControlType.INPUT },
      { text: 'Click', value: UIControlType.CLICK },
      { text: 'Browser', value: UIControlType.BROWSER },
    ];

    this.uiControlForm
      .get('isAssertVerification')
      ?.setValue(this.isAssertVerification);

    this.filteredCtlOptions = this.uiControlForm
      .get('eventOption')!
      .valueChanges.pipe(
        startWith(null),
        map((fruit: SelectModel | null) =>
          fruit ? this._filter(fruit) : this.allCtlOptions.slice()
        )
      );
    this.route.params.subscribe((params) => {
      this.testCaseId = params.testcaseid;
      this.testPlanId = params.testplanid;
    });

    this.customerService.getUserDetail().subscribe((res) => {
      this.customerDetail = res;
    });
  }

  ngOnInit(): void {
    this.saveEvent?.subscribe((params) => {
      this.createUIAction();
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      // this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.uiControlForm.get('eventOption')!.setValue(null);
  }

  remove(ctlOption: SelectModel, indexOfElement: number): void {
    // const index = this.ctlOptions.indexOf(ctlOption);
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
    this.uiControlForm.get('eventOption')!.setValue(null);
  }

  uiControlFormOption(): FormArray {
    return this.uiControlForm.get('uiControlFormOptions') as FormArray;
  }

  browserForm(): FormGroup {
    return this.uiControlForm.get('browserDetail') as FormGroup;
  }

  newUiControlOption(selectionModel: SelectModel): FormGroup {
    return new FormGroup({
      waitinseconds: new FormControl(''),
      optionType: new FormControl(selectionModel.value),
    });
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

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.isAssertVerification &&
      changes.isAssertVerification.currentValue !==
        changes.isAssertVerification.previousValue
    ) {
      if (changes.isAssertVerification.currentValue) {
        this.uiCtlActionTypes = [
          { text: 'Input', value: UIControlType.INPUT },
          { text: 'Browser', value: UIControlType.BROWSER },
        ];
      } else {
        this.uiCtlActionTypes = [
          { text: 'Input', value: UIControlType.INPUT },
          { text: 'Click', value: UIControlType.CLICK },
          { text: 'Browser', value: UIControlType.BROWSER },
        ];
      }

      this.uiControlForm
        .get('isAssertVerification')
        ?.setValue(this.isAssertVerification);
    }
  }

  createUIAction(): void {
    const createActionModel: CreateActionModel = {
      key:
        this.uiControlForm.get('keyType')?.value +
        ':' +
        this.uiControlForm.get('key')?.value,
      type: this.actionType,
      comments: this.uiControlForm.get('comments')?.value,
      value: this.uiControlForm.get('value')?.value,
      userId: this.customerDetail.userId,
      uiActionType: this.uiControlForm.get('uiactionType')?.value,
      isOptional: this.uiControlForm.get('isOptional')?.value,
      isAssertVerification: this.uiControlForm.get('isAssertVerification')
        ?.value,
      conditionType: this.uiControlForm.get('conditionType')?.value,
    };

    if (this.uiControlFormOption().length >= 1) {
      createActionModel.uiControlOptions = this.getUIControlOptions();
    }

    if (this.browserForm().controls !== null) {
      createActionModel.browserOptions = this.getBrowserOptions();
    }

    this.uiControlService
      .createUiAction(this.testCaseId, createActionModel)
      .subscribe(
        (res: any) => {
          this.snackbarService.openSnackBar('successfully created ui action');
          if (this.testPlanId) {
            this.router.navigate([
              `configuration/testplans/${this.testPlanId}/testcases/${this.testCaseId}/actions`,
            ]);
            return;
          }
          this.router.navigate([
            `configuration/testcases/${this.testCaseId}/actions`,
          ]);
        },
        (err: any) => {
          this.snackbarService.openSnackBar('error while creating ui action');
        }
      );
  }

  getBrowserOptions(): CreateActionBrowserModel {
    const createActionBrowserModel: CreateActionBrowserModel = {
      actionType: this.browserForm().get('actionType')?.value,
      value: this.browserForm().get('value')?.value,
      comments: this.browserForm().get('comments')?.value,
      conditionType: this.browserForm().get('conditionType')?.value,
    };
    return createActionBrowserModel;
  }

  getUIControlOptions(): CreateActionOptionModel[] {
    const createActionOptionModels: CreateActionOptionModel[] = [];

    const formArray = this.uiControlFormOption();
    let order = 1;
    for (const control of formArray.controls) {
      const createActionOptionModel: CreateActionOptionModel = {
        order,
        optionType: control.get('optionType')?.value,
        waitDuration: control.get('waitingSeconds')?.value,
        conditionType: control.get('conditionType')?.value,
        duration: control.get('duration')?.value,
        value: control.get('value')?.value,
        assertType: control.get('assertType')?.value,
      };
      createActionOptionModels.push(createActionOptionModel);
      order++;
    }
    return createActionOptionModels;
  }

  deleteControlOption(selectModel: SelectModel, index: number): void {
    this.ctlOptions.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    const name = '';
  }
}
