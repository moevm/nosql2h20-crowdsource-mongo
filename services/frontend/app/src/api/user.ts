import { http } from '@/api/httpAxios'
import createURLParams from '@/api/datasource/createURLParams.ts'
import _ from 'lodash'

export interface UserRegister {
  email : string
  name : string
  surname?: string
  password: string
  type: string
  customer?: string
}

export interface UserLogin {
  email : string
  password: string
}

export default class UserAPI {
  public static register(userInfo: UserRegister) {
    return http.post(`/signup`, { ...userInfo })
  }
  public static login(userInfo: UserLogin) {
    return http.post(`/login`, { ...userInfo })
  }
  public static getUser(idUser: string) {
    return http.get(`/${idUser}`)
  }
}
