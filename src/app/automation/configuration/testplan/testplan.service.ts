import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateTestplanModel } from './models/CreateTestplanModel';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TestPlanModel } from './models/TestPlanModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { UpdateTestplanStatusModel } from './models/UpdateTestplanStatusModel';
import { UpdateTestplanModel } from './models/UpdateTestplanModel';
import { CopyTestPlanModel } from './models/CopyTestPlanModel';

@Injectable({
  providedIn: 'root',
})
export class TestplanService {
  constructor(private httpClient: HttpClient) {}

  copyTestPlan(
    testPlanId: string,
    copyTestPlanModel: CopyTestPlanModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + `/api/testPlans/${testPlanId}/copy`,
      copyTestPlanModel
    );
  }

  createTestplan(
    createTestplanModel: CreateTestplanModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + '/api/testPlans',
      createTestplanModel
    );
  }

  getTestPlansByUserId(userId: string): Observable<TestPlanModel[]> {
    return this.httpClient.get<TestPlanModel[]>(
      environment.canaApiUrl + '/api/testplans?userId=' + userId
    );
  }

  getTestPlanById(testPlanId: string): Observable<TestPlanModel> {
    return this.httpClient.get<TestPlanModel>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId
    );
  }

  deleteTestPlanById(testPlanId: string): Observable<ErrorMessageModel[]> {
    return this.httpClient.delete<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId
    );
  }

  updateTestPlanStatus(
    testPlanId: string,
    updateTestplanStatusModel: UpdateTestplanStatusModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId + '/status',
      updateTestplanStatusModel
    );
  }

  updateTestPlan(
    testPlanId: string,
    updateTestplanModel: UpdateTestplanModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl + '/api/testPlans/' + testPlanId,
      updateTestplanModel
    );
  }
}
