import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

import { routes } from './app.routes';
import { AppConfigService } from "./core/services/app-config.service";

registerLocaleData(en);

function initializeApp( appConfigService: AppConfigService ): () => Promise<void> {
  return () => appConfigService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(en_US),
    importProvidersFrom(
      FormsModule,
      NzLayoutModule,
      NzSpaceModule,
      NzTabsModule,
      NzIconModule),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(),
    provideAppInitializer(() => {
        const initializerFn = (initializeApp)(inject(AppConfigService));
        return initializerFn();
      })
  ]
};
