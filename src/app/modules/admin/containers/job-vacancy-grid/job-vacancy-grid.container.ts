// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

import { jobVacanciesOperation } from 'src/app/shared/operations/queries'
import { deleteJobVacancyOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './job-vacancy-grid.container.html',
  styleUrls: ['./job-vacancy-grid.container.scss']
})
export class JobVacancyGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  data: any[] = []
  filteredData: any[] = []
  columns: any[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.jobVacancy') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('jobVacancies').subscribe((cols) => {
      this.filterOptions = [
        { key: 'positionName', text: cols.positionName },
        { key: 'clientServiceName', text: cols.clientServiceName },
        { key: 'totalVacanciesString', text: cols.totalVacancies },
        { key: 'requiredDocumentsPathsString', text: cols.requiredDocumentsPaths },
        { key: 'jobVacanciesStatusString', text: cols.jobVacanciesStatusString }
      ]
    })

    this.columns = [...this.filterOptions]
    this.columns.push({
      key: 'actions',
      text: this.translate.instant('catalogs.cols.actions')
    })
  }

  loadData () {
    this.loading = true
    this.graphqlService.execute(jobVacanciesOperation).then((result: any) => {
      this.loading = false
      this.data = result
      this.data.map((jobVacancy: any) => {
        jobVacancy.positionName = jobVacancy.position.name
        jobVacancy.clientServiceName = jobVacancy.clientService.name
        jobVacancy.requiredDocumentsPathsString = jobVacancy.requiredDocumentsPaths ? jobVacancy.requiredDocumentsPaths.toString() : this.translate.instant('jobVacancies.noDocuments')
        jobVacancy.jobVacanciesStatusString = !jobVacancy.jobVacanciesStatus ? this.translate.instant('jobVacancies.inProcess') : jobVacancy.jobVacanciesStatus === 1 ? this.translate.instant('jobVacancies.completed') : 'N/A'
        jobVacancy.totalVacanciesString = jobVacancy.totalVacancies + ' / ' + (jobVacancy.recruits && jobVacancy.recruits.lenght > 0 ? jobVacancy.recruits.lenght : 0)
        return jobVacancy
      })

      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
    const confirm = await this.notifyService.deleteConfirm()
    if (confirm) {
      this.loading = true
      this.graphqlService.execute(deleteJobVacancyOperation, { id }).then(
        (result: any) => {
          this.loading = false
          this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
          this.loadData()
        }
      )
    }
  }
}
