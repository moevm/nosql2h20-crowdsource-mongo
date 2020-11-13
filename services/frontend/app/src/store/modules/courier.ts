import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import CourierAPI from "@/api/courier";

class CourierState {
  orders: any[] = []
}

class CourierGetters extends Getters<CourierState> {
  // TODO
}

class CourierMutations extends Mutations<CourierState> {
  // TODO
  setAllOrders(newOrders: any){
    console.log('ClientMutations setFilterCatalog', newOrders)
    this.state.orders = newOrders
  }
}

class CourierActions extends Actions<
    CourierState,
    CourierGetters,
    CourierMutations,
    CourierActions
> {
  async fetchAllOrders() {
    try {
      console.log('fetchAllOrders start')
      const response = await CourierAPI.getAllOrders()
      console.log('fetchAllOrders', response.data)
      this.mutations.setAllOrders(response.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export const courier = new Module({
  state: CourierState,
  getters: CourierGetters,
  mutations: CourierMutations,
  actions: CourierActions
})

export const courierMapper = createMapper(courier)
