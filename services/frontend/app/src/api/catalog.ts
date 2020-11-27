import { http } from '@/api/httpAxios'
import { AxiosPromise } from 'axios'
import createURLParams from '@/api/datasource/createURLParams.ts'
/*import {
  InterestsPartner,
  PartnerSendSpecialties,
  PartnerSendSubjects
} from '@/store/modules/client'*/
import _ from 'lodash'
export interface Products {
  name: string
  price: number
  description: string
  categoryId: number
}
/*async function formatNewsData(news: any, avatarChanged?: boolean) {
  const formData = new FormData()

  if (avatarChanged) {
    const avatarBlob = await (await fetch(news.avatar)).blob()
    const avatarFile = new File([avatarBlob], 'avatar.png', {
      type: 'image/png'
    })
    formData.append('avatar', avatarFile)

    const avatarCroppedBlob = await (await fetch(news.avatarCropped)).blob()
    const avatarCroppedFile = new File(
      [avatarCroppedBlob],
      'avatarCropped.png',
      {
        type: 'image/png'
      }
    )
    formData.append('croppedAvatar', avatarCroppedFile)
    formData.append('croppedAvatarMeta', '0')
  }

  formData.append('title', news.title)
  if (!_.isNil(news.eventDateTime)) {
    formData.append('eventDateTime', news.eventDateTime)
  }
  if (!_.isNil(news.eventLocation)) {
    formData.append('eventLocation', news.eventLocation)
  }
  if (!_.isNil(news.shortInfo)) {
    formData.append('shortInfo', news.shortInfo)
  }
  if (!_.isNil(news.info)) {
    formData.append('info', news.info)
  }

  return formData
}*/

export default class CatalogAPI {
  /*  public static getAllCatalog() {
    return http.get(`/categories`)
  }
  public static getAllProduct(categoryID: number) {
    const params = new URLSearchParams()
    params.append('categoryId', categoryID.toString())
    return http.get(`/products`, { params })
  }*/

  public static addCategoty(nameCategoty: string): AxiosPromise {
    return http.post('/categories/add', { name: nameCategoty })
  }

  public static addProducts(newProducts: Products): AxiosPromise {
    return http.post('/products/add', newProducts)
  }
  /*public static deletePartner(partnerId: number): AxiosPromise {
    return http.delete(`/companies/${partnerId}`)
  }*/

  /*public static updatePartnerInfoByPRManager(
    partnerID: number,
    departments: number[],
    title: string
  ): AxiosPromise {
    return http.put(`/companies/${partnerID}`, {
      departmentIds: departments,
      title: title
    })
  }*/

  /*public static getPartnersWithDeps(): AxiosPromise {
    return http.get('/companies?scopes=withDepartments')
  }*/

  /*public static getOnePartner(partnerId: number) {
    const params = new URLSearchParams()
    params.append('scopes', 'countLikesDislikes')
    params.append('scopes', 'defaultScope')
    return http.get(`/companies/${partnerId}`, { params })
  }*/
  /*public static async updatePartnerInfo(partner: any) {
    await http.put(`/companies/${partner.id}`, {
      siteUrl: partner.url,
      info: partner.info
    })

    const filesData = new FormData()

    if (partner.avatar && partner.croppedAvatar) {
      const avatarBlob = await (await fetch(partner.avatar)).blob()
      const avatarFile = new File([avatarBlob], 'avatar.png', {
        type: 'image/png'
      })
      filesData.append('logo', avatarFile)

      const avatarCroppedBlob = await (
        await fetch(partner.croppedAvatar)
      ).blob()
      const avatarCroppedFile = new File(
        [avatarCroppedBlob],
        'avatarCropped.png',
        {
          type: 'image/png'
        }
      )

      filesData.append('croppedlogo', avatarCroppedFile)
      filesData.append('croppedAvatarMeta', '0')
    }

    for (const galleryImage of partner.gallery) {
      if (_.isNil(galleryImage.id) && !_.isNil(galleryImage.file)) {
        filesData.append('gallery', galleryImage.file)
      }
    }

    for (const presentationFile of partner.presentation) {
      if (_.isNil(presentationFile.id)) {
        filesData.append('presentation', presentationFile.file)
      }
    }

    await http.post(`/companies/${partner.id}/files`, filesData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }*/
}
