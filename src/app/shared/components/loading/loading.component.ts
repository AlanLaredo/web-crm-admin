/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable accessor-pairs */
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: './loading.component.html',
  selector: 'component-loading',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loadingIntervalMs: number = 500

  closeTimeOutMs: number = 500

  _isLoading: boolean = false

  _loadingMessage: string = ''

  value: number = 0

  timer: any = null

  get isLoading (): boolean {
    return this._isLoading
  }

  @Input()
  set isLoading (isLoading: boolean) {
    this.loadLoading(isLoading)
  }

  @Input()
  set loadingMessage (loadingMessage: string) {
    this._loadingMessage = loadingMessage || this.translate.instant('messages.loadingMessage')
  }

  @Output() loadingEnd: EventEmitter<void> = new EventEmitter()

  constructor (private translate: TranslateService) {
  }

  ngOnInit () {
    setTimeout(() => {
      this._loadingMessage = this.translate.instant('messages.loadingMessage')
    }, 0)
    this.loadLoading(this._isLoading)
  }

  loadLoading (isLoading: boolean) {
    if (isLoading) {
      this.startLoading()
    } else {
      this.stopLoading()
    }
  }

  startLoading () {
    this.resetLoading()
    this._isLoading = true
    this.timer = setInterval(() => {
      this.value += (100 - this.value) / 40
    }, this.loadingIntervalMs)
  }

  stopLoading () {
    this.value = 100
    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this._isLoading = false
      this.loadingEnd.emit()
    }, this.closeTimeOutMs)
  }

  resetLoading () {
    this.value = 0
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
