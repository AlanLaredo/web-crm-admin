// Third Party
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { createPrenominaConfigurationOperation, deletePrenominaConfigurationOperation, updatePrenominaConfigurationOperation } from 'src/app/shared/operations/mutations'
import { clientsOperation, prenominaConfigurationsOperation } from 'src/app/shared/operations/queries'
import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { PrenominaGroupFormModalComponent } from '../../components'

@Component({
  templateUrl: './prenominal-grid.container.html',
  styleUrls: ['./prenominal-grid.container.scss']
})
export class PrenominalGridContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  filteredData: any[] = []
  columns: any[] = []
  prenominaConfigurations: any[] = []
  clients: any[] = []

  // datesInfo: string = ''

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private notifyService: NotifyService,
    private titleService: Title,
    private graphqlService: GraphqlService,
    private dialog: MatDialog
  ) { }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('submenu.prenominal') + ' - ' + this.translate.instant('applicationTitle'))

    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('prenomina').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name }
      ]
    })

    this.columns = [...this.filterOptions]
    this.columns.push({
      key: 'actions',
      text: this.translate.instant('catalogs.cols.actions')
    })
  }

  async loadData () {
    this.loading = true
    const promises = [
      this.graphqlService.execute(prenominaConfigurationsOperation),
      this.graphqlService.execute(clientsOperation)
    ]

    const [prenominaConfigurations, clients] = await Promise.all(promises)
    this.loading = false
    this.prenominaConfigurations = prenominaConfigurations
    this.clients = clients

    this.setDataFiltered(this.prenominaConfigurations)
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  new () {
    this.openformGroupDialog()
  }

  async removeConfiguration (prenominaConfigurationId: string) {
    if (await this.notifyService.confirm(this.translate.instant('prenomina.questionRemoveConfiguration'))) {
      this.loading = true
      await this.deleteConfiguration(prenominaConfigurationId)
      this.loadData()
      this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
    }
  }

  async deleteConfiguration (id: string) {
    return this.graphqlService.execute(deletePrenominaConfigurationOperation, { id })
  }

  openformGroupDialog (prenominaConfiguration: any = null) {
    if (this.loading) {
      return
    }
    const dialogRef = this.dialog.open(PrenominaGroupFormModalComponent, {
      maxWidth: '750px',
      data: {
        title: this.translate.instant('prenomina.configuration'),
        clients: this.clients,
        prenominaConfiguration,
        disabled: prenominaConfiguration && prenominaConfiguration.id
      }
    })
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        this.loading = true

        prenominaConfiguration = await this.savePrenominaConfiguration(result)
        this.loadData()
      }
    })
  }

  savePrenominaConfiguration (prenominaConfiguration: any) {
    return this.graphqlService.execute(
      prenominaConfiguration && prenominaConfiguration.id ? updatePrenominaConfigurationOperation : createPrenominaConfigurationOperation,
      prenominaConfiguration)
  }
}
