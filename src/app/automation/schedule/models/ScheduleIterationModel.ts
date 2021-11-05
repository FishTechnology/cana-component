export interface ScheduleIterationModel {
  id: number;
  scheduleId: number;
  status: string;
  comments: string;
  isRecordVideoEnabled: boolean;
  isDisableScreenshot: boolean;
  isCaptureNetworkTraffic: boolean;
  startedOn: string;
  completedOn: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
}
