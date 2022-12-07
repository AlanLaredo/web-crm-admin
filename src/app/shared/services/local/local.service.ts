/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */

import { Injectable } from '@angular/core'
import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor () { }

  getItem<T> (itemName: string): T | undefined {
    const itemValue: any = localStorage.getItem(itemName)
    if (itemName) {
      return JSON.parse(itemValue)
    } else {
      return undefined
    }
  }

  setItem<T> (itemName: string, itemValue: T): void {
    localStorage.setItem(itemName, JSON.stringify(itemValue))
  }

  removeItem (itemName: string): void {
    localStorage.removeItem(itemName)
  }

  clearAllItems (): void {
    localStorage.clear()
  }
}
