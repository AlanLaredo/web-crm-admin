// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { GraphqlService, NotifyService } from 'src/app/shared/services'

@Component({
  templateUrl: './prenominal-grid.container.html',
  styleUrls: ['./prenominal-grid.container.scss']
})
export class PrenominalGridContainer implements OnInit {
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
    this.titleService.setTitle(this.translate.instant('submenu.prenominal') + ' - ' + this.translate.instant('applicationTitle'))

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
    // this.graphqlService.execute(jobVacanciesOperation).then((result: any) => {
    //   this.loading = false
    //   this.data = result
    //   this.data.map((prenominal: any) => {
    //     prenominal.positionName = prenominal.position.name
    //     prenominal.clientServiceName = prenominal.clientService.name
    //     prenominal.requiredDocumentsPathsString = prenominal.requiredDocumentsPaths ? prenominal.requiredDocumentsPaths.toString() : this.translate.instant('jobVacancies.noDocuments')
    //     prenominal.jobVacanciesStatusString = !prenominal.jobVacanciesStatus ? this.translate.instant('jobVacancies.inProcess') : prenominal.jobVacanciesStatus === 1 ? this.translate.instant('jobVacancies.completed') : 'N/A'
    //     prenominal.totalVacanciesString = prenominal.totalVacancies + ' / ' + (prenominal.recruits && prenominal.recruits.lenght > 0 ? prenominal.recruits.lenght : 0)
    //     return prenominal
    //   })

    //   this.setDataFiltered(this.data)
    // })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  async delete (id: any) {
    // const confirm = await this.notifyService.deleteConfirm()
    // if (confirm) {
    //   this.loading = true
    //   this.graphqlService.execute(deletePrenominalOperation, { id }).then(
    //     (result: any) => {
    //       this.loading = false
    //       this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
    //       this.loadData()
    //     }
    //   )
    // }
  }
}
