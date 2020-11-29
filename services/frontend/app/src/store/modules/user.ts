import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import UserAPI, { UserRegister, UserLogin } from '@/api/user.ts'

class UserState {
  userId = -1
  token: any = null
  isAuthenticated = false
  userInfo = {
    name: '',
    surname: '',
    type: '',
    email: '',
    customer: ''
  }
}

class UserGetters extends Getters<UserState> {
  // TODO
}

class UserMutations extends Mutations<UserState> {
  // TODO
  setNewUserId(id: number) {
    this.state.userId = id
  }
  setToken(token: any) {
    this.state.token = token
    localStorage.setItem('user-token', token)
    this.state.isAuthenticated = true
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
      this.state.isAuthenticated = false
      console.error(err)
    }
  }
  async fetchLoginUser(loginObj: UserLogin) {
    try {
      console.log('fetchLoginUser start')
      const response = await UserAPI.login(loginObj)
      console.log('fetchLoginUser', response.data)
      this.mutations.setToken(response.data.token)
    } catch (err) {
      this.state.isAuthenticated = false
      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
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
