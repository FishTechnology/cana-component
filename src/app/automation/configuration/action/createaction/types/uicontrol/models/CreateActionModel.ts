import { CreateActionBrowserModel } from './CreateActionBrowserModel';
import { CreateActionOptionModel } from './CreateActionOptionModel';

export interface CreateActionModel {
  type: string;
  uiActionType: string;
  key: string;
  value?: string;
  comments?: string;
  userId: string;
  isAssertVerification: boolean;
  uiControlOptions?: CreateActionOptionModel[];
  browserOptions?: CreateActionBrowserModel;
}
