import { CreateNotificationModel } from './CreateNotificationModel';

export interface CreateScheduleModel {
  environmentId: number;
  userId: string;
  isRecordVideoEnabled: boolean;
  isDisableScreenshot: boolean;
  isCaptureNetworkTraffic: boolean;
  browserType: string;
  notification?: CreateNotificationModel;
  retryCount?: number;
  resolution?: string;
}
