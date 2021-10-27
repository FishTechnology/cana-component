export interface UpdateGlobalVariableModel {
  key: string;
  value: string;
  valueType: string;
  userId: string;
  comments?: string;
  file?: FormData;
}
