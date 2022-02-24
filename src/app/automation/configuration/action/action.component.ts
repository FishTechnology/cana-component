import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/commons/customer/customer.service';
import { SnackbarService } from 'src/app/commons/snackbar/snackbar.service';
import { ActionService } from './action.service';
import { ActionDetailModel } from './models/ActionDetailModel';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UpdateActionOrderModel } from './models/UpdateActionOrderModel';
import { ActionOrderModel } from './models/ActionOrderModel';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  testPlanId!: string;
  testCaseId!: string;
  actionDetailModels!: ActionDetailModel[];
  isEnableDragAndDrop = true;

  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
    private actionService: ActionService
  ) {
    this.route.params.subscribe((params) => {
      this.testCaseId = params.testcaseid;
      this.testPlanId = params.testplanid;
      this.getActionByTestCaseId();
    });
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.getActionByTestCaseId();
  }

  navigateToActionCreation(): void {
    let url = `/configuration/testcases/${this.testCaseId}/actions/create`;
    if (this.testPlanId) {
      url = `/configuration/testplans/${this.testPlanId}/testcases/${this.testCaseId}/actions/create`;
    }
    this.router.navigate([url]);
  }

  navigateToActionEdit(): void {
    let url = `/configuration/testplans/${this.testPlanId}/testcases/${this.testCaseId}/actions/edit`;
    if (this.testPlanId) {
      url = `/configuration/testcases/${this.testCaseId}/actions/edit`;
    }
    this.router.navigate([url]);
  }

  getActionByTestCaseId(): void {
    this.actionService
      .getActionByTestCaseId(this.testCaseId)
      .subscribe((res) => {
        this.actionDetailModels = res;
      });
  }

  drop(event: CdkDragDrop<ActionDetailModel[]>): void {
    moveItemInArray(this.actionDetailModels, event.previousIndex, event.currentIndex);
  }

  deleteAction(action: ActionDetailModel): void {
    this.actionService.deleteActionById(this.testCaseId, action.id)
      .subscribe({
        next: (res) => {
          if (res) {
            this.snackbarService.openSnackBar('successfully deleted action');
            this.getActionByTestCaseId();
          }
        },
        error: (err) => {
          this.snackbarService.openSnackBar('error while deleting action');
        }
      });
  }

  saveActionOrder(): void {
    const actionOrderModels: ActionOrderModel[] = [];
    let currentOrder = 1;
    for (const actionDetailModel of this.actionDetailModels) {
      const actionOrderModel: ActionOrderModel = {
        actionId: actionDetailModel.id,
        currentExecutionOrder: currentOrder,
        oldExecutionOrder: actionDetailModel.order
      };
      actionOrderModels.push(actionOrderModel);
      currentOrder++;
    }
    const updateActionOrderModel: UpdateActionOrderModel = {
      actionOrderModels
    };

    this.actionService.updateOrder(this.testCaseId, updateActionOrderModel).subscribe({
      next: (res) => {
        this.snackbarService.openSnackBar('successfully updated action order');
      },
      error: (err) => {
        this.snackbarService.openSnackBar('error while updating action order');
      }
    });
  }
}
