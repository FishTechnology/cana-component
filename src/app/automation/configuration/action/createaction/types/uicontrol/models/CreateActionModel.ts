import { CreateActionBrowserModel } from './CreateActionBrowserModel';
import { CreateActionOptionModel } from './CreateActionOptionModel';
import { CreateActionKeyModel } from './CreateActionKeyModel';

export interface CreateActionModel {
  type: string;
  uiActionType: string;
  key: string;
  value?: string;
  comments?: string;
  userId: string;
  isAssertVerification: boolean;
  isOptional?: boolean;
  uiControlOptions?: CreateActionOptionModel[];
  browserOptions?: CreateActionBrowserModel;
  conditionType?: string;
  uiActionKeys?: CreateActionKeyModel[];
}
