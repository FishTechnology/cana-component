import { ErrorMessageModel } from './ErrorMessageModel';

export interface ResultModel {
  id: string;
  errorMessages?: ErrorMessageModel[];
}
