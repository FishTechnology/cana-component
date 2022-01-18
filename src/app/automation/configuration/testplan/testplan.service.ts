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
    applicationId: string,
    createTestplanModel: CreateTestplanModel
  ): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(
      environment.canaApiUrl + `/api/applications/${applicationId}/testPlans`,
      createTestplanModel
    );
  }

  getTestPlansByUserId(
    applicationId: string,
    userId: string
  ): Observable<TestPlanModel[]> {
    return this.httpClient.get<TestPlanModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testplans?userId=` +
        userId
    );
  }

  getTestPlanById(
    applicationId: string,
    testPlanId: string
  ): Observable<TestPlanModel> {
    return this.httpClient.get<TestPlanModel>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId
    );
  }

  deleteTestPlanById(
    applicationId: string,
    testPlanId: string
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.delete<ErrorMessageModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId
    );
  }

  updateTestPlanStatus(
    applicationId: string,
    testPlanId: string,
    updateTestplanStatusModel: UpdateTestplanStatusModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId +
        '/status',
      updateTestplanStatusModel
    );
  }

  updateTestPlan(
    applicationId: string,
    testPlanId: string,
    updateTestplanModel: UpdateTestplanModel
  ): Observable<ErrorMessageModel[]> {
    return this.httpClient.put<ErrorMessageModel[]>(
      environment.canaApiUrl +
        `/api/applications/${applicationId}/testPlans/` +
        testPlanId,
      updateTestplanModel
    );
  }
}
