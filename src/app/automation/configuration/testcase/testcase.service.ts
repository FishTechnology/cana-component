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
    applicationId: string,
    testPlanId: string,
    createTestCaseByTestPlanIdModel: CreateTestCaseByTestPlanIdModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId +
        '/testCases',
      createTestCaseByTestPlanIdModel
    );
  }

  createTestCase(
    applicationId: string,
    createTestCaseModel: CreateTestCaseModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + `/api/applications/${applicationId}/testCases`,
      createTestCaseModel
    );
  }

  getTestCaseByUserId(
    applicationId: string,
    userId: string
  ): Observable<TestCaseModel[]> {
    return this.httpClient.get<TestCaseModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testCases?userId=` +
        userId
    );
  }

  getTestCaseByTestPlanId(
    applicationId: string,
    testPlanId: string
  ): Observable<TestCaseModel[]> {
    return this.httpClient.get<TestCaseModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId +
        '/testCases'
    );
  }

  getTestCaseById(
    applicationId: string,
    testCaseId: string
  ): Observable<TestCaseModel> {
    return this.httpClient.get<TestCaseModel>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testCases/` +
        testCaseId
    );
  }

  updateTestCaseOrder(
    applicationId: string,
    testPlanId: string,
    updateTestCaseOrderModel: UpdateTestCaseOrderModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/${testPlanId}/testCases/order`,
      updateTestCaseOrderModel
    );
  }
}
