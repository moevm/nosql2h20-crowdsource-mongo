import axios, { AxiosInstance } from 'axios'
import Config from '@/config/configs.ts'
import Vue from "vue";

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/trajectories/api'
    : 'http://localhost:5000/'

export const clientBase =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080'

export const socketPath = '/api/socket.io'

export const socketURL =
  process.env.NODE_ENV === 'production' ? '' : 'localhost:5000'

export const http: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true
})
