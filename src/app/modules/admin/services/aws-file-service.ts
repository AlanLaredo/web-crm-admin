/* eslint-disable no-useless-constructor */
/* eslint-disable no-self-assign */
import { Injectable } from '@angular/core'
import * as S3 from 'aws-sdk/clients/s3'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AwsFileService {
  s3Object: any
  constructor () {
    this.s3Object = new S3(
      {
        accessKeyId: 'AKIAQ6IKE4QWLFXZSHZD',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    )
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
        Bucket: 'crmadmin',
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

    // Thirdfor upload progress
    /*
    this.s3Object.upload(params).on('httpUploadProgress', function (evt) {
              console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
          }).send(function (err, data) {
              if (err) {
                  console.log('There was an error uploading your file: ', err);
                  return false;
              }
              console.log('Successfully uploaded file.', data);
              return true;
          });
      */
  }

  public getSignedUrl (key: string): Observable<string> {
    const params = {
      Bucket: 'crmadmin',
      Key: key
    }

    const downloadUrl = this.s3Object.getSignedUrl('getObject', params)
    return of(downloadUrl)
  }

  getBlob (key: string) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'crmadmin',
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
        Bucket: 'crmadmin',
        Key: key
      }

      return this.s3Object.deleteObject(params, (err: any, data: any) => {
        console.log(err)
        console.log(data)
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
}
