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

  getScheduleByUserId(userId: string): Observable<ScheduleModel> {
    const url = environment.canaApiUrl + '/api/schedules?userId=' + userId;
    return this.httpClient.get<ScheduleModel>(url);
  }

  getScheduleIterationByScheduleId(
    scheduleId: number
  ): Observable<ScheduleIterationModel[]> {
    const url = environment.canaApiUrl + `/api/schedules/${scheduleId}`;
    return this.httpClient.get<ScheduleIterationModel[]>(url);
  }

  createSchedule(
    testPlanId: string,
    createScheduleModel: CreateScheduleModel
  ): Observable<ResultModel> {
    const url =
      environment.canaApiUrl + `/api/testPlans/${testPlanId}/schedules`;
    return this.httpClient.post<ResultModel>(url, createScheduleModel);
  }

  getScheduleResult(
    scheduleId: number,
    scheduleIterationId: number
  ): Observable<ScheduleIterationResultModel> {
    const url =
      environment.canaApiUrl +
      `/api/schedules/${scheduleId}/scheduleIterations/${scheduleIterationId}/result`;
    return this.httpClient.get<ScheduleIterationResultModel>(url);
  }

  updateScheduleStatus(
    scheduleId: number,
    updateScheduleStatusModel: UpdateScheduleStatusModel
  ): Observable<ErrorMessageModel[]> {
    const url = environment.canaApiUrl + `/api/schedules/${scheduleId}/status`;
    return this.httpClient.put<ErrorMessageModel[]>(
      url,
      updateScheduleStatusModel
    );
  }

  reSchedule(
    scheduleId: number,
    reScheduleStatusModel: ReScheduleStatusModel
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl + `/api/schedules/${scheduleId}/reschedule`;
    return this.httpClient.put<ErrorMessageModel[]>(url, reScheduleStatusModel);
  }
}
