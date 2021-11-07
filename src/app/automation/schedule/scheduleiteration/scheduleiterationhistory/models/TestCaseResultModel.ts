import { ActionResultModel } from './ActionResultModel';

export interface TestCaseResultModel {
  id: number;
  testCaseName: string;
  duration: string;
  status: string;
  errorMessage: string;
  executionOrder: number;
  actionResults: ActionResultModel[];
}
