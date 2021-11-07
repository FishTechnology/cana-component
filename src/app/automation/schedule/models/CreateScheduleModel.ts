export interface CreateScheduleModel {
  environmentId: number;
  userId: string;
  isRecordVideoEnabled: boolean;
  isDisableScreenshot: boolean;
  isCaptureNetworkTraffic: boolean;
  browserType: string;
}
