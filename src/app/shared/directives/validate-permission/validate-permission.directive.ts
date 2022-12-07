/* eslint-disable no-unused-vars */
/* eslint-disable accessor-pairs */
import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core'
import { LoginService } from '../../../modules/auth/services'

@Directive({
  selector: '[validatePermission]'
})
export class ValidatePermissionDirective {
  actions: any

  constructor (
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private loginService: LoginService
  ) {
    this.actions = this.loginService.getPermissions()
  }

  @Input() set validatePermission (code: string) {
    if (code === undefined) {
      throw new Error('Code is required or null')
    }
    if (code === null || this.actions.indexOf(code.toString()) >= 0) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainerRef.clear()
    }
  }
}
