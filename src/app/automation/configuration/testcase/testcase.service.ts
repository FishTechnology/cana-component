import { Injectable } from '@angular/core';
import { CreateTestCaseModel } from './models/CreateTestCaseModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateTestCaseByTestPlanIdModel } from './models/CreateTestCaseByTestPlanIdModel';
import { Observable } from 'rxjs';
import { TestCaseModel } from './models/TestCaseModel';
import { UpdateTestCaseOrderModel } from './models/UpdateTestCaseOrderModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  constructor(private httpClient: HttpClient) {}

  createTestCaseByTestPlanId(
    testPlanId: string,
    createTestCaseByTestPlanIdModel: CreateTestCaseByTestPlanIdModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId + '/testCases',
      createTestCaseByTestPlanIdModel
    );
  }

  createTestCase(
    createTestCaseModel: CreateTestCaseModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/testCases',
      createTestCaseModel
    );
  }

  getTestCaseByUserId(userId: string): Observable<TestCaseModel[]> {
    return this.httpClient.get<TestCaseModel[]>(
      environment.canaApiUrl + '/api/testCases?userId=' + userId
    );
  }

  getTestCaseByTestPlanId(testPlanId: string): Observable<TestCaseModel[]> {
    return this.httpClient.get<TestCaseModel[]>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId + '/testCases'
    );
  }

  getTestCaseById(testCaseId: string): Observable<TestCaseModel> {
    return this.httpClient.get<TestCaseModel>(
      environment.canaApiUrl + '/api/testCases/' + testCaseId
    );
  }

  updateTestCaseOrder(
    testPlanId: string,
    updateTestCaseOrderModel: UpdateTestCaseOrderModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + `/api/testPlans/${testPlanId}/testCases/order`,
      updateTestCaseOrderModel
    );
  }
}
