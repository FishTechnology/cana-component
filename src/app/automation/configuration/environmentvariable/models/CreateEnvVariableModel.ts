export interface CreateEnvVariableModel {
  key: string;
  value: string;
  userId: string;
  type: string;
  comments: string;
  content?: string;
}
