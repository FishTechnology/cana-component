import { TestCaseResultModel } from './TestCaseResultModel';

export interface TestPlanResultSummaryModel {
  id: number;
  testPlanName: string;
  duration: string;
  status: string;
  testCaseResults: TestCaseResultModel[];
}
