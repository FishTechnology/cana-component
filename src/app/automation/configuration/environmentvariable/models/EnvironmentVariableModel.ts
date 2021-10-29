export interface EnvironmentVariableModel {
  id: number;
  key: string;
  value: string;
  type: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  isActive: boolean;
  comments: string;
  userId: string;
  environmentId: number;
  content: string;
}
