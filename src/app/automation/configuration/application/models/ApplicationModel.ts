export interface ApplicationModel {
  id: BigInt;
  userId: BigInt;
  name: string;
  comments: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  isActive: boolean;
}
