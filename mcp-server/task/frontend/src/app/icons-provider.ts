import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  CopyOutline,
  ReloadOutline,
  EyeOutline,
  EyeInvisibleOutline
} from '@ant-design/icons-angular/icons';
import { Provider } from '@angular/core';

export const iconsProvider: Provider = {
  provide: NZ_ICONS,
  useValue: [CopyOutline, ReloadOutline, EyeOutline, EyeInvisibleOutline],
};
