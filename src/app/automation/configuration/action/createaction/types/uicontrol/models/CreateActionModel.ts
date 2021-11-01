import { CreateActionOptionModel } from './CreateActionOptionModel';

export interface CreateActionModel {
  type: string;
  key: string;
  value?: string;
  comments?: string;
  userId: string;
  optionModels?: CreateActionOptionModel[];
}
