import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionDetailModel } from './models/ActionDetailModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private httpClient: HttpClient) {}

  getActionByTestCaseId(testCaseId: number): Observable<ActionDetailModel[]> {
    const url = environment.canaApiUrl + `/api/testCases/${testCaseId}/actions`;
    return this.httpClient.get<ActionDetailModel[]>(url);
  }
}
