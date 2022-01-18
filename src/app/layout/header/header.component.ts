import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ApplicationService } from 'src/app/automation/configuration/application/application.service';
import { ApplicationModel } from 'src/app/automation/configuration/application/models/ApplicationModel';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { CustomerDetail } from 'src/app/commons/customer/models/CustomerDetail';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  applicationSelect = new FormControl('', [Validators.required]);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  matcher = new MyErrorStateMatcher();
  customerDetail!: CustomerDetail;
  applications!: ApplicationModel[];

  constructor(
    private applicationService: ApplicationService,
    private customerService: CustomerService,
    private snackbarService: SnackbarService
  ) {
    this.customerService.getUserDetail().subscribe({
      next: (res) => {
        this.customerDetail = res;
        this.getApplicationsByUserId();
      },
    });
  }

  ngOnInit(): void {}

  getApplicationsByUserId(): void {
    this.applicationService
      .getApplicationByUserId(this.customerDetail.userId)
      .subscribe({
        next: (res) => {
          this.applications = res;
          if (this.applications) {
            this.applicationSelect.setValue(this.customerDetail.applicationId);
          } else {
          }
        },
        error: (err) => {
          this.snackbarService.openSnackBar('error loading global config');
        },
      });
  }

  applicationChange(applicationModel: ApplicationModel): void {
    window.location.reload();
  }
}

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
