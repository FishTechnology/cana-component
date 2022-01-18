import ConfigKeyValueModel from './config-key-value-model';

export default interface ConfigModel {
  id: string;
  name: string;
  type: string;
  userId: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  comments: string;
  isActive: boolean;
  applicationId: string;
  configKeyValues: ConfigKeyValueModel[];
}
