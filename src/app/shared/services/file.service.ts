/* eslint-disable no-useless-constructor */

import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor (private http: HttpClient) {}

  downloadFile (url: string): any {
    return this.http.get(url)
  }
}
