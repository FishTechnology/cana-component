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

  getScheduleByAppId(
    applicationId: string,
    userId: string
  ): Observable<ScheduleModel> {
    const url =
      environment.canaApiUrl + `/api/applications/${applicationId}/schedules`;
    return this.httpClient.get<ScheduleModel>(url);
  }

  getScheduleIterationByScheduleId(
    applicationId: string,
    scheduleId: string
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
    scheduleId: string,
    scheduleIterationId: string
  ): Observable<ScheduleIterationResultModel> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}/scheduleIterations/${scheduleIterationId}/result`;
    return this.httpClient.get<ScheduleIterationResultModel>(url);
  }

  updateScheduleStatus(
    applicationId: string,
    scheduleId: string,
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
    scheduleId: string,
    reScheduleStatusModel: ReScheduleStatusModel
  ): Observable<ErrorMessageModel[]> {
    const url =
      environment.canaApiUrl +
      `/api/applications/${applicationId}/schedules/${scheduleId}/reschedule`;
    return this.httpClient.put<ErrorMessageModel[]>(url, reScheduleStatusModel);
  }

  chipColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'READY':
        return 'undefined';
      case 'ERROR':
        return 'warn';
      case 'COMPLETED':
        return 'primary';
      case 'CANCELLED':
        return 'accent';
      case 'INPROGRESS':
        return 'primary';
      case 'PAUSE':
        return 'accent';
      case 'RE_SCHEDULE':
        return 'undefined';
      default:
        return 'primary';
    }
  }
}
