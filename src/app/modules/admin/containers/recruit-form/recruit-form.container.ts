// Third Party
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import Swal from 'sweetalert2'

import { GraphqlService, NotifyService } from 'src/app/shared/services'
import { jobVacancyOperation, recruitOperation } from 'src/app/shared/operations/queries'
import { createRecruitOperation, updateRecruitOperation } from 'src/app/shared/operations/mutations'

@Component({
  templateUrl: './recruit-form.container.html',
  styleUrls: ['./recruit-form.container.scss']
})
export class RecruitFormContainer implements OnInit {
  loading: boolean = false
  public filterOptions: any = []
  title: string = ''
  data: any = {}
  jobVacancyId: string = ''
  documents: string [] = []
  /* eslint-disable no-useless-constructor */
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private graphqlService: GraphqlService,
    public translate: TranslateService,
    private notifyService: NotifyService
  ) {
  }

  async ngOnInit () {
    const params = this.activatedRoute.snapshot.params
    this.loading = true

    if (params.elementId) {
      this.jobVacancyId = params.elementId
    }

    const promises: Promise<any>[] = [
      this.graphqlService.execute(jobVacancyOperation, { id: this.jobVacancyId })
    ]

    if (params && params.recruitId) {
      this.title = 'general.titles.edition'
      promises.push(this.graphqlService.execute(recruitOperation, { id: params.recruitId }))
    } else {
      this.title = 'general.titles.creation'
    }
    const [jobVacancy, data] = await Promise.all(promises)
    this.loading = false

    if (data) {
      this.data = data
    }

    this.documents = jobVacancy.requiredDocumentsPaths || []
  }

  save ($event: any) {
    const data = $event
    data.jobVacancyId = this.jobVacancyId
    this.loading = true
    this.graphqlService.execute(data.id ? updateRecruitOperation : createRecruitOperation, data).then(
      (response: any) => {
        this.data = response
        this.loading = false
        if (!data.id) {
          Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
            this.router.navigate(['/admin/recruitment/job-vacancies/' + this.jobVacancyId + '/recruits'])
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

  toPromote () {
    if (this.data && this.data.statusApplicant === 0) {
      this.save({
        id: this.data.id,
        statusApplicant: 1
      })
    } else if (this.data.statusApplicant === 1) {
      const documents = this.documents.filter(document => !(this.data.requiredDocumentsPaths || []).find((element: string) => element === document))
      if (documents.length === 0) {
        this.router.navigate(['/admin/recruitment/job-vacancies/' + this.jobVacancyId + '/recruits/' + this.data.id + '/edit/employee'])
        // Swal.fire({ icon: 'success', titleText: this.translate.instant('messages.save.success') }).then(() => {
        //   this.router.navigate(['/admin/recruitment/job-vacancies/' + this.jobVacancyId + '/recruits'])
        // })
      }
      console.log(documents)
    }
  }
}
