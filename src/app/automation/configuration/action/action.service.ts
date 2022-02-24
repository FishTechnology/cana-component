import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionDetailModel } from './models/ActionDetailModel';
import { environment } from 'src/environments/environment';
import { ErrorMessageModel } from '../../../commons/models/ErrorMessageModel';
import { UpdateActionOrderModel } from './models/UpdateActionOrderModel';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private httpClient: HttpClient) {
  }

  getActionByTestCaseId(testCaseId: string): Observable<ActionDetailModel[]> {
    const url = environment.canaApiUrl + `/api/testCases/${testCaseId}/actions`;
    return this.httpClient.get<ActionDetailModel[]>(url);
  }

  deleteActionById(testCaseId: string, actionId: string): Observable<ErrorMessageModel[]> {
    const url = environment.canaApiUrl + `/api/testCases/${testCaseId}/actions/${actionId}`;
    return this.httpClient.delete<ErrorMessageModel[]>(url);
  }

  updateOrder(testCaseId: string, updateActionOrderModel: UpdateActionOrderModel): Observable<ErrorMessageModel[]> {
    const url = environment.canaApiUrl + `/api/testCases/${testCaseId}/actions/order`;
    return this.httpClient.put<ErrorMessageModel[]>(url, updateActionOrderModel);
  }
}
