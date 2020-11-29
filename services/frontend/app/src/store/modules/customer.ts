import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import ClientAPI from '@/api/client'

export interface FileManual {
  valueAnswer: string
  fileValue: any
}
export interface AddOrder {
  title: string
  description: string
  dataManualFile: any[]
  dataManualText: any[]
  dataFile: any
  indexManual: number
}

class CustomerState {
  addOrder: any = {
    title: '',
    description: '',
    dataManualFile: [],
    dataManualText: [],
    dataFile: {},
    indexManual: -1
  }
  orderList: any[] = []
  editOrder: any = null
}

class CustomerGetters extends Getters<CustomerState> {
  // TODO
}

class CustomerMutations extends Mutations<CustomerState> {
  // TODO
  setEditOrder(editOrder: any) {
    this.state.editOrder = editOrder
  }
  setOrderList(orderList: any[]) {
    this.state.orderList = orderList
  }
  addOrderInList(orderList: any) {
    this.state.orderList = this.state.orderList.concat(orderList)
  }
  setAddOrder(obj: AddOrder) {
    this.state.addOrder = obj
  }
  deleteOrderWithId(id: string) {
    this.state.orderList = this.state.orderList.filter(
      (i: any) => i._id.$oid !== id
    )
  }
}

class CustomerActions extends Actions<
  CustomerState,
  CustomerGetters,
  CustomerMutations,
  CustomerActions
> {
  async fetchAllOrders() {
    try {
      const response = await ClientAPI.getAllOrders()
      this.mutations.setOrderList(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  async fetchAddOrders(objSend: any) {
    try {
      const response = await ClientAPI.addOrder(objSend)
      this.mutations.addOrderInList({
        ...objSend,
        _id: { $oid: response.data.id }
      })
    } catch (err) {
      console.error(err)
    }
  }
}

export const customer = new Module({
  state: CustomerState,
  getters: CustomerGetters,
  mutations: CustomerMutations,
  actions: CustomerActions
})

export const customerMapper = createMapper(customer)
