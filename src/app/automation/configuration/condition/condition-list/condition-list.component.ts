import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ConditionModel from '../models/condition-model';

@Component({
  selector: 'app-condition-list',
  templateUrl: './condition-list.component.html',
  styleUrls: ['./condition-list.component.scss'],
})
export class ConditionListComponent implements OnInit {
  dataSource = new MatTableDataSource<ConditionModel>();
  displayedColumns: string[] = ['select', 'name', 'createdon', 'comments'];
  selection = new SelectionModel<ConditionModel>(true, []);
  url: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.url = route.url.pipe(map((segments) => segments.join('/')));
  }

  ngOnInit(): void {}

  refresh(): void {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ConditionModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //  // row.key + 1
    // }`;
    return '';
  }

  navigateCreateCondition(): void {
    this.url.subscribe((url) => {
      this.router.navigateByUrl('/configuration/' + url + '/create');
    });
  }
}
