import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { map, startWith } from 'rxjs/operators';
import { UiControlService } from './uicontrol.service';
import { CreateActionModel } from './models/CreateActionModel';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';

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
  @Input() saveEvent!: EventEmitter<string>;
  @ViewChild('ctlOptionInput') ctlOptionInput!: ElementRef<HTMLInputElement>;
  @Input() actionType!: string;
  selectable = true;
  removable = true;
  customerDetail!: CustomerDetail;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  uiControlForm: FormGroup;
  filteredCtlOptions: Observable<SelectModel[]>;
  ctlOptions: SelectModel[] = [];
  allCtlOptions: SelectModel[] = [
    { text: 'Wait', value: 'WAIT' },
    { text: 'Wait For Visible', value: 'WAIT_FOR_VISIBLE' },
  ];
  uiCtlActionTypes: SelectModel[];
  matcher = new MyErrorStateMatcher();
  uiControlOptions: SelectModel[] = [
    { text: 'Wait', value: 'WAIT' },
    { text: 'Wait For Visible', value: 'WAIT_FOR_VISIBLE' },
  ];
  testCaseId!: number;

  constructor(
    private uiControlService: UiControlService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    public customerService: CustomerService
  ) {
    this.uiControlForm = new FormGroup({
      type: new FormControl('', Validators.required),
    });
    this.uiControlForm = new FormGroup({
      uiactionType: new FormControl('input', Validators.required),
      key: new FormControl('', Validators.required),
      value: new FormControl(''),
      eventOption: new FormControl(''),
      comments: new FormControl(''),
    });
    this.uiCtlActionTypes = [
      { text: 'Input', value: 'input' },
      { text: 'Click', value: 'click' },
    ];

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
      //this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.uiControlForm.get('eventOption')!.setValue(null);
  }

  remove(ctlOption: SelectModel): void {
    const index = this.ctlOptions.indexOf(ctlOption);

    if (index >= 0) {
      this.ctlOptions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ctlOptions.push(event.option.value);
    this.ctlOptionInput.nativeElement.value = '';
    this.uiControlForm.get('eventOption')!.setValue(null);
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

  drop(event: any) {
    //moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

  createUIAction(): void {
    let createActionModel: CreateActionModel = {
      key: this.uiControlForm.get('key')?.value,
      type: this.actionType,
      comments: this.uiControlForm.get('comments')?.value,
      value: this.uiControlForm.get('value')?.value,
      userId: this.customerDetail.userId,
    };
    this.uiControlService
      .createUiAction(this.testCaseId, createActionModel)
      .subscribe(
        (res: any) => {
          this.snackbarService.openSnackBar('successfully created ui action');
          this.router.navigate([`testcases/${this.testCaseId}/actions`]);
        },
        (err: any) => {
          this.snackbarService.openSnackBar('error while creating ui action');
        }
      );
  }
}
