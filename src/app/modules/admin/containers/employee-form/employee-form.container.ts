// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { clientsOperation, companiesOperation, employeeOperation, jobVacancyOperation, positionsOperation, recruitOperation } from 'src/app/shared/operations/queries'
import { createEmployeeOperation, updateEmployeeOperation } from 'src/app/shared/operations/mutations'
import createEmployeeReassignment from 'src/app/shared/operations/mutations/createEmployeeReassignment'
import updateRecruit from 'src/app/shared/operations/mutations/updateRecruit'
import { AwsFileService } from '../../services'

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
  dataAttachedQuotePath : any[] = []

  jobVacancy: any = {}
  recruit: any = {}
  disableConfiguration: boolean = false

  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphqlService: GraphqlService,
    public translate: TranslateService,
    private notifyService: NotifyService,
    private awsFileService: AwsFileService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true
    const promises: Promise<any>[] = [
      this.graphqlService.execute(companiesOperation),
      this.graphqlService.execute(clientsOperation),
      this.graphqlService.execute(positionsOperation)
    ]
    if (params) {
      if (params.elementId) {
        this.title = 'general.titles.edition'
        promises.push(this.graphqlService.execute(employeeOperation, { id: params.elementId }))
      } else {
        this.title = 'general.titles.creation'
      }
      if (params.jobVacancyId && params.recruitId) {
        this.disableConfiguration = !!params.jobVacancyId
        promises.push(this.graphqlService.execute(recruitOperation, { id: params.recruitId }))
        promises.push(this.graphqlService.execute(jobVacancyOperation, { id: params.jobVacancyId }))
      }
    }
    const [companies, clients, positions, data, jobVacancy] = await Promise.all(promises)
    this.companies = companies
    this.clients = clients
    this.positions = positions
    this.jobVacancy = jobVacancy || {}

    if (data && !params.recruitId) {
      this.data = data
    } else if (params.recruitId && params.jobVacancyId) {
      this.recruit = data
      this.data.address = this.recruit.data.address
      delete this.recruit.data.address
      this.data.person = this.recruit.data
      // this.data.companyId = this.jobVacancy.companyId
      this.data.clientId = this.jobVacancy.clientService.clientId
      this.data.positionId = this.jobVacancy.positionId
    }
    if (this.data && this.data.attachedQuotePath) {
      this.dataAttachedQuotePath = this.data.attachedQuotePath
    }
    this.loading = false
  }

  async reasignment ($event: any) {
    const { clientId, reason } = $event
    await this.graphqlService.execute(createEmployeeReassignment, {
      employeId: this.data.id,
      transmitterClientId: this.data.clientId,
      receiverClientId: clientId,
      reason,
      companyId: this.data.companyId
    })
    this.save({ id: this.data.id, clientId })
  }

  async save ($event: any) {
    const data = $event
    const files = data.newFiles
    this.loading = true

    this.processRemovedFiles(this.dataAttachedQuotePath || [], $event?.attachedQuotePath || [])

    if (files && files.length > 0) {
      const processFiles = files.map((element: any) => {
        return new File([element.file], (uuidv4() + '_' + element.document + '_' + element.file.name), { type: element.file.type })
      })
      const newFiles = await this.filesToAws(processFiles)
      data.attachedQuotePath = [...newFiles, ...data.attachedQuotePath]
    }
    delete data.newFiles

    if (!this.loading) {
      this.loading = true
    }
    this.graphqlService.execute(data.id ? updateEmployeeOperation : createEmployeeOperation, data).then(
      async (response: any) => {
        this.data = response
        this.dataAttachedQuotePath = this.data.attachedQuotePath
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(async () => {
            if (this.jobVacancy && this.jobVacancy.id) {
              await this.graphqlService.execute(updateRecruit, { id: this.recruit.id, statusApplicant: 2 })
              this.router.navigate(['/admin/recruitment/job-vacancies/' + this.jobVacancy.id + '/recruits/'])
            } else {
              this.router.navigate(['/admin/employee/employees'])
            }
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

  async processRemovedFiles (lastAttachedQuotePath: any, newAttachedQuotePath: any) {
    if ((!newAttachedQuotePath || newAttachedQuotePath.length === 0) && lastAttachedQuotePath && lastAttachedQuotePath.length > 0) {
      await Promise.all(lastAttachedQuotePath.map((element: string) => this.awsFileService.delete(element)))
    }
    if (lastAttachedQuotePath && lastAttachedQuotePath.length > 0 && newAttachedQuotePath && newAttachedQuotePath.length > 0) {
      const deleteFiles = lastAttachedQuotePath.filter((element: string) => !newAttachedQuotePath.includes(element))
      await Promise.all(deleteFiles.map((element: string) => this.awsFileService.delete(element)))
    }
  }

  async filesToAws (files: any[]) {
    const awsFiles = await this.uploadAws(files)
    return awsFiles.map(file => file.key)
    // const attachedQuotePath: string[] = awsFiles.map(file => file.key)
    // this.save({ id, attachedQuotePath })
    // filesToAws
  }

  async uploadAws (files: any[]): Promise<any[]> {
    return await Promise.all(files.map(file => this.awsFileService.uploadFile(file, 'employeeDocuments')))
  }
}
