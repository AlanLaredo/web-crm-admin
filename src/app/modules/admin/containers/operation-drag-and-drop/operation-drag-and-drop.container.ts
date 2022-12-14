// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'

import { companiesOperation, companyOperation, processFunctionsOperation, processListOperation } from 'src/app/shared/operations/queries'
import { deleteProcessOperation } from 'src/app/shared/operations/mutations'
import { LoginService } from 'src/app/modules/auth/services'
import { ProcessFormModalComponent } from '../../components'

@Component({
  templateUrl: './operation-drag-and-drop.container.html',
  styleUrls: ['./operation-drag-and-drop.container.scss']
})
export class OperationDragAndDropContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  processFunctions: any[] = []
  companies: any[] = []
  filteredData: any[] = []
  user: any

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.user = this.loginService.getUser()
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.process') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()

    const diffObjects = this.deepDiffMapper()
    const original = {
      username: 'alan',
      email: 'santiagoalan1@gmail.com',
      address: {
        street: '2da avenida',
        externalNumber: 54,
        internalNumber: 1
      }
    }
    const afterUpdated = {
      username: 'alan222',
      apPat: 'Laredo',
      address: {
        street: '2da avenida',
        externalNumber: 53
      }
    }
    const result: any = diffObjects.map(original, afterUpdated)

    const transpilation = this.objectToArray(result)
    console.log(result)
    console.log(transpilation)
  }

  objectToArray (object: any, parentKey: string = '') {
    let result: any[] = []

    if ('data' in object && 'type' in object) {
      result.push({ key: parentKey, ...object })
    } else if (this.isObject(object)) {
      Object.keys(object).forEach(key => {
        result = [...result, ...this.objectToArray(object[key], parentKey !== '' ? parentKey + '.' + key : key)]
      })
    }

    return result
  }

  loadTranslations () {
  }

  async loadData () {
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphqlService.execute(processFunctionsOperation),
      this.graphqlService.execute(companiesOperation)
    ]

    if (this.user.userRole.name !== 'CrmAdmin') {
      // promises.push(this.graphqlService.execute(companyOperation, this.user.companyId))
    } else {
      // promises.push(this.graphqlService.execute(companiesOperation))
    }

    this.loading = true
    const [processFunctions, companies] = await Promise.all(promises)
    this.loading = false

    this.processFunctions = processFunctions
    this.companies = companies
  }

  newProcess (process: any = null) {
    const dialogRef = this.dialog.open(ProcessFormModalComponent, {
      width: '450px',
      data: {
        title: this.translate.instant('process.form'),
        process,
        processFunctions: this.processFunctions,
        companies: this.companies
      }
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result)
      // if (resultForm && resultForm.save) {
      //   if (visit.id) {
      //     this.loading = true
      //     this.visitService.update(visit.id, { activities: resultForm.outData }).subscribe((result: IVisit) => {
      //       this.loading = false
      //       this.visits = this.visits.map(visitRow => {
      //         if (visitRow.id === visit.id) {
      //           visitRow.activities = result.activities
      //         }
      //         return visitRow
      //       })
      //       this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
      //     })
      //   }
      // }
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteProcessOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }

  deepDiffMapper () {
    return {
      VALUE_CREATED: 'created',
      VALUE_UPDATED: 'updated',
      VALUE_DELETED: 'deleted',
      VALUE_UNCHANGED: 'unchanged',
      map: function (obj1: any, obj2: any) {
        if (this.isFunction(obj1) || this.isFunction(obj2)) {
          throw new Error('Invalid argument. Function given, object expected.')
        }
        if (this.isValue(obj1) || this.isValue(obj2)) {
          const typeComparationResult = this.compareValues(obj1, obj2)
          const result: any = {
            type: typeComparationResult,
            data: obj1 === undefined ? obj2 : obj1
          }
          if (typeComparationResult === this.VALUE_UPDATED) {
            result.newData = obj2
          }
          return result
        }

        const diff: any = {}
        for (const key in obj1) {
          if (this.isFunction(obj1[key])) {
            continue
          }

          let value2
          if (obj2[key] !== undefined) {
            value2 = obj2[key]
          }

          diff[key] = this.map(obj1[key], value2)
        }
        for (const key in obj2) {
          if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
            continue
          }

          diff[key] = this.map(undefined, obj2[key])
        }
        return diff
      },
      compareValues: function (value1: any, value2: any) {
        if (value1 === value2) {
          return this.VALUE_UNCHANGED
        }
        if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
          return this.VALUE_UNCHANGED
        }
        if (value1 === undefined) {
          return this.VALUE_CREATED
        }
        if (value2 === undefined) {
          return this.VALUE_DELETED
        }
        return this.VALUE_UPDATED
      },
      isFunction: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Function]'
      },
      isArray: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Array]'
      },
      isDate: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Date]'
      },
      isObject: function (x: any) {
        return Object.prototype.toString.call(x) === '[object Object]'
      },
      isValue: function (x: any) {
        return !this.isObject(x) && !this.isArray(x)
      }
    }
  }
  /*
  var result = deepDiffMapper.map({
    a: 'i am unchanged',
    b: 'i am deleted',
    e: {
      a: 1,
      b: false,
      c: null
    },
    f: [1, {
      a: 'same',
      b: [{
        a: 'same'
      }, {
        d: 'delete'
      }]
    }],
    g: new Date('2017.11.25')
  }, {
    a: 'i am unchanged',
    c: 'i am created',
    e: {
      a: '1',
      b: '',
      d: 'created'
    },
    f: [{
      a: 'same',
      b: [{
        a: 'same'
      }, {
        c: 'create'
      }]
    }, 1],
    g: new Date('2017.11.25')
  });
  console.log(result);
  */

  isFunction (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Function]'
  }

  isArray (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Array]'
  }

  isDate (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Date]'
  }

  isObject (x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Object]'
  }

  isValue (x: any): boolean {
    return !this.isObject(x) && !this.isArray(x)
  }
}
