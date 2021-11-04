import { Injectable } from '@angular/core';
import { CreateTestCaseModel } from './models/CreateTestCaseModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateTestCaseByTestPlanIdModel } from './models/CreateTestCaseByTestPlanIdModel';
import { Observable } from 'rxjs';
import { TestCaseModel } from './models/TestCaseModel';

@Injectable({
  providedIn: 'root',
})
export class TestCaseService {
  constructor(private httpClient: HttpClient) {}

  createTestCaseByTestPlanId(
    testPlanId: number,
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

  getTestCaseByTestPlanId(testPlanId: number): Observable<TestCaseModel[]> {
    return this.httpClient.get<TestCaseModel[]>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId + '/testCases'
    );
  }

  getTestCaseById(testCaseId: number): Observable<TestCaseModel> {
    return this.httpClient.get<TestCaseModel>(
      environment.canaApiUrl + '/api/testCases/' + testCaseId
    );
  }
}
