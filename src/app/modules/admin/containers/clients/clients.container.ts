// Third Party
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { NotifyService } from 'src/app/shared/services'
import Swal from 'sweetalert2'
import { IClient } from '../../models/data'
import { ClientService } from '../../services'

@Component({
  templateUrl: './clients.container.html',
  styleUrls: ['./clients.container.scss']
})
export class ClientsContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  filteredData: IClient[] = []
  data: IClient[] = []

  /* eslint-disable no-useless-constructor */
  constructor (
    private translate: TranslateService,
    private clientService: ClientService,
    private notifyService: NotifyService,
    private titleService: Title
  ) {
  }

  ngOnInit () {
    this.titleService.setTitle(this.translate.instant('clients.titles.page') + ' - ' + this.translate.instant('applicationTitle'))
    this.loadTranslations()
    this.loadData()
  }

  loadTranslations () {
    this.translate.stream('clients.cols').subscribe((cols) => {
      this.filterOptions = [
        { key: 'name', text: cols.name },
        { key: 'email', text: cols.email },
        { key: 'managerName', text: cols.managerName },
        { key: 'contactNumbers', text: cols.contactNumbers },
        { key: 'address', text: cols.address }
      ]
    })
  }

  loadData () {
    this.loading = true
    this.clientService.list().subscribe((result) => {
      this.loading = false
      this.data = result
      this.setDataFiltered(this.data)
    })
  }

  setDataFiltered (filteredData: any) {
    this.filteredData = filteredData
  }

  delete (id: string) {
    Swal.fire({
      icon: 'question',
      title: this.translate.instant('messages.delete.confirmQuestion'),
      showConfirmButton: true,
      showCancelButton: true
    }).then((rs) => {
      if (rs.isConfirmed) {
        this.loading = true
        this.clientService.remove(id).subscribe(
          (result: IClient) => {
            this.loading = false
            this.notifyService.notify(this.translate.instant('messages.delete.success'), 'success')
            this.loadData()
          }
        )
      }
    })
  }
}
