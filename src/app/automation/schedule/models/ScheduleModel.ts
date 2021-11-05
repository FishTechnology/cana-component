import { ScheduleItemModel } from './ScheduleItemModel';

export interface ScheduleModel {
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  scheduleItem: ScheduleItemModel[];
}
