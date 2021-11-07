import { ScheduleIterationModel } from '../../../models/ScheduleIterationModel';
import { ScheduleModel } from './ScheduleModel';
import { TestPlanResultSummaryModel } from './TestPlanResultSummaryModel';

export interface ScheduleIterationResultModel {
  schedule: ScheduleModel;
  scheduleIteration: ScheduleIterationModel;
  testPlanResultSummary: TestPlanResultSummaryModel;
}
