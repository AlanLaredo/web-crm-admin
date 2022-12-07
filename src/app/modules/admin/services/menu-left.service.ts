import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class MenuLeftService {
  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();

  /* eslint-disable no-useless-constructor */
  constructor () { }
}
