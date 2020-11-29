import { http } from '@/api/httpAxios'
import createURLParams from '@/api/datasource/createURLParams.ts'
import _ from 'lodash'

export default class ClientAPI {
  public static getAllOrders() {
    return http.get(`/orders`)
  }
  public static addOrder(orderInfo: any) {
    return http.post(`/orders`, { ...orderInfo })
  }
  public static editCustomerOrder(orderInfo: any) {
    const sendObj: any = _.cloneDeep(orderInfo)
    delete sendObj._id;
    return http.put(`/orders/${orderInfo._id.$oid}`, { ...sendObj })
  }
  public static editWorkerOrder(orderInfo: any, id: string) {
    console.log('_____ editWorkerOrder editWorkerOrder',id, orderInfo)
    console.log('_____ editWorkerOrder editWorkerOrder after')
    return http.put(`/orders/${id}`, { ...orderInfo })
  }
  public static deleteCustomerOrder(id: string) {
    return http.delete(`/orders/${id}`)
  }
  public static getFullInfoOrder(id: string) {
    return http.get(`/orders/${id}`)
  }
}