/* eslint-disable no-useless-constructor */
/* eslint-disable accessor-pairs */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'

import { UploadFileModel } from './upload-file.model'

@Component({
  selector: 'upload-files-component',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UploadFilesComponent implements OnInit {
  @Input('cleanImages')
  set cleanImages (cleanImages: boolean) {
    if (cleanImages) {
      this.files = []
    }
  }

  @Input() text = 'Upload'
  @Input() accept = '*'
  @Input() multiple: boolean = false

  // tslint:disable-next-line:no-output-native
  @Output() complete = new EventEmitter<string>()
  @Output() outActionUploadFile = new EventEmitter<UploadFileModel>()
  @Output() outActionRemoveFile = new EventEmitter<number>()
  fileInformation: any
  public files: Array<UploadFileModel> = []

  // tslint:disable-next-line:variable-name
  constructor (
  ) { }

  ngOnInit () {
  }

  clieckFileInput () {
    const fileUpload = document.getElementById('fileUpload') as any

    fileUpload.onchange = () => {
      if (fileUpload && fileUpload.files) {
        if (!this.multiple) {
          this.files.forEach(file => {
            this.removeFileFromArray(file)
          })
        }
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index]
          this.files.push({
            data: file,
            state: 'in',
            inProgress: false,
            progress: 0,
            canRetry: false,
            canCancel: true
          })
        }
        this.uploadFiles()
      }
    }

    fileUpload.click()
  }

  cancelFile (file: UploadFileModel) {
    if (file) {
      this.removeFileFromArray(file)
    }
  }

  retryFile (file: UploadFileModel) {
    this.uploadFile(file)

    file.canRetry = false
  }

  private uploadFile (file: UploadFileModel) {
    if (file && file.data) {
      this.outActionUploadFile.emit(file)
    }
  }

  private uploadFiles () {
    const fileUpload = document.getElementById('fileUpload') as any
    fileUpload.value = ''

    this.files.forEach(file => {
      this.uploadFile(file)
    })
  }

  private removeFileFromArray (file: UploadFileModel) {
    const index = this.files.indexOf(file)
    if (index > -1) {
      this.files.splice(index, 1)
    }
    this.outActionRemoveFile.emit(index)
  }
}
