// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'

import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { recruitsOperation } from 'src/app/shared/operations/queries'
import { deleteRecruitOperation } from 'src/app/shared/operations/mutations'
import { Router } from '@angular/router'

@Component({
  templateUrl: './recruit-grid.container.html',
  styleUrls: ['./recruit-grid.container.scss']
})
export class RecruitGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  // filteredData: any[] = []
  filteredDataApplicants: any[] = []
  filteredDataCandidates: any[] = []

  columns: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private router: Router
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.recruit') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('recruit').subscribe((cols) => {
      this.filterOptions = [
        { key: 'dataName', text: cols.dataName },
        { key: 'dataPhoneContacts', text: cols.dataPhoneContacts },
        { key: 'dataEmails', text: cols.dataEmails },
        { key: 'dataComments', text: cols.dataComments }
      ]
    })
    this.columns = this.filterOptions.map((column: any) => {
      column.id = column.key
      column.name = column.text
      return column
    })
    this.columns.push({
      id: 'actions',
      name: this.translate.instant('catalogs.cols.actions')
    })
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(recruitsOperation).then((result: any) => {
      this.data = result
      this.data = this.data.map(recruit => ({
        id: recruit.id,
        dataName: recruit.data.name + (recruit.data.lastName ? ' ' + recruit.data.lastName : ''),
        dataPhoneContacts: recruit.data.phoneContacts && recruit.data.phoneContacts.length > 0 ? recruit.data.phoneContacts[0] : 'N/A',
        dataEmails: recruit.data.emails && recruit.data.emails.length > 0 ? recruit.data.emails[0] : 'N/A',
        dataComments: recruit.data.comments,
        statusApplicant: recruit.statusApplicant
      }))
      this.loading = false
      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredDataApplicants = filteredData.filter((element: any) => element.statusApplicant === 0)
    this.filteredDataCandidates = filteredData.filter((element: any) => element.statusApplicant === 1)
  }

  async delete (id: any) {
    if (await this.notifyService.deleteConfirm()) {
      this.loading = true
      this.graphqlService.execute(deleteRecruitOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }

  backHistory () {
    this.router.navigate(['/admin/recruitment/job-vacancies/'])
  }
}
