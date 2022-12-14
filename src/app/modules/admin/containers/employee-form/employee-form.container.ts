// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientsOperation, companiesOperation, employeeOperation, positionsOperation } from 'src/app/shared/operations/queries'
import { createEmployeeOperation, updateEmployeeOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './employee-form.container.html',
  styleUrls: ['./employee-form.container.scss']
})
export class EmployeeFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  companies: any[] = []
  positions: any[] = []
  clients: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphQlService: GraphqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphQlService.execute(companiesOperation),
      this.graphQlService.execute(clientsOperation),
      this.graphQlService.execute(positionsOperation)
    ]

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(employeeOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [companies, clients, positions, data] = await Promise.all(promises)
    this.loading = false
    this.companies = companies
    this.clients = clients
    this.positions = positions

    if (data) {
      this.data = data
    }
  }

  save ($event: any) {
    const data = $event
    this.loading = true
    this.graphQlService.execute(data.id ? updateEmployeeOperation : createEmployeeOperation, data).then(
      (response: any) => {
        this.data = response
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/employee/employees'])
          })
        } else {
          this.notifyService.notify(this.translate.instant('messages.update.success'), 'success')
        }
      },
      () => {
        this.notifyService.notify(this.translate.instant('messages.update.error'), 'error')
        this.loading = false
      }
    )
  }
}
