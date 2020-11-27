import axios, { AxiosInstance } from 'axios'
import Config from '@/config/configs.ts'

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/trajectories/api'
    : 'http://localhost:3000/api'

export const clientBase =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'

export const socketPath = '/api/socket.io'

export const socketURL =
  process.env.NODE_ENV === 'production' ? '' : 'localhost:3000'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true
})

http.interceptors.request.use(config => {
  if (!Config.urlsWithoutInterceptors.includes(config.url!)) {
    const store = require('@/store/index').default
    store.commit('loading/enqueue', null, { root: true })
  }
  return config
})

http.interceptors.response.use(
  response => {
    if (!Config.urlsWithoutInterceptors.includes(response.config.url!)) {
      const store = require('@/store/index').default
      store.commit('loading/dequeue', null, { root: true })
    }
    return response
  },
  error => {
    if (!Config.urlsWithoutInterceptors.includes(error.config.url!)) {
      const store = require('@/store/index').default
      store.commit('loading/dequeue', null, { root: true })
      console.error(error.response)
      store.dispatch('toast/pushToast', {
        error: true,
        title: 'Ошибка',
        message:
          error.response?.data?.message || `Ошибка ${error.response.code}`
      })
      store.commit('logger/addLog', {
        userId: 1,
        severity: 'error',
        message: 'ERROR',
        page: window.location.pathname,
        error: {
          type: `axioserror${
            error.response?.status ? ` ${error.response?.status}` : ''
          }`,
          message: error.response?.data?.message ?? '',
          stack: error.response?.data?.stack ?? ''
        },
        timestamp: Date.now()
      })
      store.dispatch('logger/sendLogs')
    }
    throw error
  }
)
