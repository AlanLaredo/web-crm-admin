/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import * as S3 from 'aws-sdk/clients/s3'
import { Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AwsFileService {
  s3Object: any
  bucketName: string
  constructor () {
    this.s3Object = new S3(
      {
        accessKeyId: environment.aws_file_service.access_key_id,
        secretAccessKey: environment.aws_file_service.secret_access_key,
        region: environment.aws_file_service.region
      }
    )
    this.bucketName = environment.aws_file_service.bucket
  }

  // {
  //   accessKeyId: 'AKIA3VX47VBEYSZCWBVW',
  //   secretAccessKey: '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',
  //   region: 'us-east-2'
  // }

  uploadFile (file: any, directory: string) {
    return new Promise((resolve, reject) => {
      const contentType = file.type
      const params = {
        Bucket: this.bucketName,
        Key: directory + '/' + file.name,
        Body: file,
        ContentType: contentType
      }

      this.s3Object.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  public getSignedUrl (key: string): Observable<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key
    }

    const downloadUrl = this.s3Object.getSignedUrl('getObject', params)
    return of(downloadUrl)
  }

  getBlob (key: string) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.bucketName,
        Key: key
      }

      return this.s3Object.getObject(params, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data.Body)
      })
    })
  }

  delete (key: string) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.bucketName,
        Key: key
      }

      return this.s3Object.deleteObject(params, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
}
