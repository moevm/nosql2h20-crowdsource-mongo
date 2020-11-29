import { http } from '@/api/httpAxios'
import { AxiosPromise } from 'axios'
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
    console.log('register UserAPI ', { ...userInfo })
    return http.post(`/signup`, { ...userInfo })
  }
  public static login(userInfo: UserLogin) {
    console.log('login UserAPI ', { ...userInfo })
    return http.post(`/login`, { ...userInfo })
  }
}
