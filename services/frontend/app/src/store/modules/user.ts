import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import UserAPI, { UserRegister, UserLogin } from '@/api/user.ts'
import Vue from "vue";
import {http} from "@/api/httpAxios";
import Config from '@/config/configs'

class UserState {
  userId = ''//'5fc35fb1f95de0304367d53d'
  token: any = null
  isAuthenticated = !!localStorage.getItem('user-token')
  userInfo = {
    name: '',
    surname: '',
    type: '',
    email: '',
    customer: ''
  }
  isWork = this.userInfo.type === Config.typeUser[0]
}

class UserGetters extends Getters<UserState> {
  // TODO
}

class UserMutations extends Mutations<UserState> {
  // TODO
  logOut() {
    localStorage.removeItem('user-token')
    this.state.isAuthenticated = !!localStorage.getItem('user-token')
  }
  setNewUserId(id: string) {
    console.log('setNewUserId', id)
    this.state.userId = id
  }
  setToken(token: any) {
    console.log('setToken', token)
    this.state.token = token
    localStorage.setItem('user-token', token)
    this.state.isAuthenticated = !!localStorage.getItem('user-token')
  }
  setUserInfo(userInfo: any) {
    console.log('setUserInfo', userInfo)
    this.state.userInfo.name = userInfo.name
    this.state.userInfo.email = userInfo.email
    this.state.userInfo.customer = userInfo.customer
    this.state.userInfo.type = userInfo.type
    this.state.userInfo.surname = userInfo.surname
    this.state.isWork = this.state.userInfo.type === Config.typeUser[0]
  }
}

class UserActions extends Actions<
  UserState,
  UserGetters,
  UserMutations,
  UserActions
> {
  async fetchRegisterUser(registerObj: UserRegister) {
    try {
      console.log('fetchRegisterUser start', registerObj)
      const response = await UserAPI.register(registerObj)
      console.log('fetchRegisterUser', response.data)
      this.mutations.setNewUserId(response.data.id)
      await this.actions.fetchLoginUser({email: registerObj.email, password: registerObj.password})
    } catch (err) {
      this.state.isAuthenticated = !!localStorage.getItem('user-token')
      console.error(err)
    }
  }
  async fetchLoginUser(loginObj: UserLogin) {
    try {
      console.log('fetchLoginUser start')
      const response = await UserAPI.login(loginObj)
      console.log('fetchLoginUser', response.data)
      this.mutations.setToken(response.data.token)
      this.mutations.setNewUserId(response.data.user_id)
      const token = localStorage.getItem('user-token')
      console.log('fetchLoginUser Authorization', token)
      if (token) {
        console.log(' fetchLoginUser Authorization', token)
        http.defaults.headers.common['Authorization'] = 'Bearer ' + token
        console.log(' http watch', http.defaults)
      }
      await this.actions.fetchGetUser()
    } catch (err) {
      //console.log(err.response.data)
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      this.state.isAuthenticated = !!localStorage.getItem('user-token')
      console.error(err)
    }
  }
  async fetchGetUser() {
    try {
      const token = localStorage.getItem('user-token')
      console.log('fetchGetUser Authorizationlocal Storage ', token)
      console.log('fetchGetUser start', this.state.userId)
      const response = await UserAPI.getUser(this.state.userId)
      console.log('fetchGetUser', response.data)
      this.mutations.setUserInfo(response.data)
    } catch (err) {
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
      this.state.isAuthenticated = !!localStorage.getItem('user-token')
      console.error(err)
    }
  }
}

export const user = new Module({
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
})

export const userMapper = createMapper(user)
