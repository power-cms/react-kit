import { ILoadingState } from '../../state';
import { IUser } from '../user/user.model';

export interface IAuthState extends ILoadingState {
  token?: string;
  refreshToken?: string;
  user?: Partial<IUser>;
}
