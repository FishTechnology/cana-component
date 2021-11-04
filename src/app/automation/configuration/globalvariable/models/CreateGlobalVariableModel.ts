export interface CreateGlobalVariableModel {
  key: string;
  value: string;
  valueType: string;
  userId: string;
  comments?: string;
  fileId?: number;
}
