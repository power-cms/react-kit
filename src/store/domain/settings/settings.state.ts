import { ILoadingState } from '../../state';
import { ISettings } from './settings.model';

export interface ISettingsState extends ILoadingState {
  data?: ISettings;
}
