import { RequestResponseModel } from '../../models/RequestResponseModel';

export interface DetailComponentProps {
  request: RequestResponseModel;
  isLoading?: boolean;
}