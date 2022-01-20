import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleModel } from './models/ScheduleModel';
import { environment } from 'src/environments/environment';
import { ScheduleIterationModel } from './models/ScheduleIterationModel';
import { ResultModel } from 'src/app/commons/models/ResultModel';
import { CreateScheduleModel } from './models/CreateScheduleModel';
import { ScheduleIterationResultModel } from './scheduleiteration/scheduleiterationhistory/models/ScheduleIterationResultModel';
import { ErrorMessageModel } from 'src/app/commons/models/ErrorMessageModel';
import { UpdateScheduleStatusModel } from './models/UpdateScheduleStatusModel';
import { ReScheduleStatusModel } from './models/ReScheduleStatusModel';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(public httpClient: HttpClient) {}

  getScheduleByUserId(
    applicationId: string,
    userId: string
  ): Observable<ScheduleModel> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules?userId=` +
      userId;
    return this.httpClient.get<ScheduleModel>(url);
  }

  getScheduleIterationByScheduleId(
    applicationId: string,
    scheduleId: number
  ): Observable<ScheduleIterationModel[]> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}`;
    return this.httpClient.get<ScheduleIterationModel[]>(url);
  }

  createSchedule(
    applicationId: string,
    testPlanId: string,
    createScheduleModel: CreateScheduleModel
  ): Observable<ResultModel> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/testPlans/${testPlanId}/schedules`;
    return this.httpClient.post<ResultModel>(url, createScheduleModel);
  }

  getScheduleResult(
    applicationId: string,
    scheduleId: number,
    scheduleIterationId: number
  ): Observable<ScheduleIterationResultModel> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}/scheduleIterations/${scheduleIterationId}/result`;
    return this.httpClient.get<ScheduleIterationResultModel>(url);
  }

  updateScheduleStatus(
    applicationId: string,
    scheduleId: number,
    updateScheduleStatusModel: UpdateScheduleStatusModel
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}/status`;
    return this.httpClient.put<ErrorMessageModel[]>(
      url,
      updateScheduleStatusModel
    );
  }

  reSchedule(
    applicationId: string,
    scheduleId: number,
    reScheduleStatusModel: ReScheduleStatusModel
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}/reschedule`;
    return this.httpClient.put<ErrorMessageModel[]>(url, reScheduleStatusModel);
  }
}
