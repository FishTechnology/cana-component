import { ErrorMessage } from './ErrorMessage';

export interface ResultModel {
  id: string;
  errorMessages?: ErrorMessage[];
}
