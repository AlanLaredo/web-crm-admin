/* eslint-disable no-useless-constructor */
// Third Party
import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { LoginService } from '../../services'

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = this.formBuilder.group({})

  @Output()
  outActionForm: EventEmitter<any> = new EventEmitter<any>()

  constructor (
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public translate: TranslateService
  ) { }

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.formLogin = this.formBuilder.group({
      username: new FormControl(('slaredo'), [Validators.required]),
      password: new FormControl(('Pass.word1*'), [Validators.required])
    })
  }

  public submitForm (): void {
    this.formLogin.markAllAsTouched()
    if (!this.formLogin.valid) {
      Swal.fire({ icon: 'warning', titleText: this.translate.instant('form.login.insufficientData') }).then()
      return
    }
    this.outActionForm.emit(this.formLogin.value)
  }
}
