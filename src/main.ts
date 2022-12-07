import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { RouterModule } from '@angular/router'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { routes } from './app/app-routing.module'
if (environment.production) {
  enableProdMode()
}

export const routing = RouterModule.forRoot(routes, { useHash: true })

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))
