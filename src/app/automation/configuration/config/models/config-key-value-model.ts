export default interface ConfigKeyValueModel {
  id: string;
  userId: string;
  configId: string;
  key: string;
  value: string;
  type: string;
  content: string;
  comments: string;
  isActive: boolean;
}
