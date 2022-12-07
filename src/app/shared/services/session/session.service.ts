/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */

import { Injectable } from '@angular/core'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor () { }

  getItem<T> (itemName: string): T | undefined {
    const itemValue: any = sessionStorage.getItem(itemName)
    if (itemName) {
      return JSON.parse(itemValue)
    } else {
      return undefined
    }
  }

  setItem<T> (itemName: string, itemValue: T): void {
    sessionStorage.setItem(itemName, JSON.stringify(itemValue))
  }

  removeItem (itemName: string): void {
    sessionStorage.removeItem(itemName)
  }

  clearAllItems (): void {
    sessionStorage.clear()
  }
}
