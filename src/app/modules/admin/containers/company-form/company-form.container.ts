// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService } from 'src/app/shared/services'
import { companiesOperation, companyOperation, companyGroupsOperation } from 'src/app/shared/operations/queries'
import { createCompanyOperation, updateCompanyOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './company-form.container.html',
  styleUrls: ['./company-form.container.scss']
})
export class CompanyFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  catalogsData: any = {}

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphQlService: GraphqlService,
    public translate: TranslateService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphQlService.execute(companyGroupsOperation),
      this.graphQlService.execute(companiesOperation)
    ]

    if (params && params.elementId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphQlService.execute(companyOperation, { id: params.elementId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [rsCompanyGroups, rsCompanies, data] = await Promise.all(promises)
    this.loading = false
    if (data) {
      this.data = data
    }
    this.catalogsData.companyGroups = rsCompanyGroups
    this.catalogsData.companies = rsCompanies
    this.catalogsData = { ...this.catalogsData }
  }

  save ($event: any) {
    const data = $event
    this.loading = true
    this.graphQlService.execute(data.id ? updateCompanyOperation : createCompanyOperation, data).then(
      (response: any) => {
        this.loading = false
        Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.' + (data.id ? 'update' : 'save') + '.success') }).then(() => {
          if (!data.id) {
            this.router.navigate(['/admin/company/company'])
          }
        })
      },
      () => {
        this.loading = false
      }
    )
  }
}
