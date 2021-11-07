import { ActionOptionModel } from './ActionOptionModel';

export interface ActionDetailModel {
  id: number;
  type: string;
  key: string;
  value: string;
  comments: string;
  userId: number;
  testCaseId: number;
  order: number;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  browserActionType: string;
  browserValue: string;
  isActive: boolean;
  uiActionType: string;
  isAssertVerification: boolean;
  actionOptionModels: ActionOptionModel[];
}
