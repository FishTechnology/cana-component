export interface TestCaseModel {
  id: string;
  userId: string;
  name: string;
  executionOrder: number;
  comments: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  isActive: boolean;
}
