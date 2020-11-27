import {
  Getters,
  Mutations,
  Actions,
  Module,
  createMapper
} from 'vuex-smart-module'
import ClientAPI from '@/api/client'

class ClientState {
  viewOrderPage: any = {
    pairs: []
  }
}

class ClientGetters extends Getters<ClientState> {
  // TODO
}

class ClientMutations extends Mutations<ClientState> {
  // TODO
}

class ClientActions extends Actions<
  ClientState,
  ClientGetters,
  ClientMutations,
  ClientActions
> {
  /*async fetchCatalogClient() {
    try {
      console.log('fetchCatalogClient start')
      const response = await ClientAPI.getAllCatalog()
      console.log('fetchCatalogClient', response.data)
      this.mutations.setCatalogClient(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  async fetchProductClient(categoryID: number) {
    try {
      console.log('getAllProduct start', categoryID)
      const response = await ClientAPI.getAllProduct(categoryID)
      console.log('getAllProduct', response.data)
      this.mutations.setAllProduct(response.data)
    } catch (err) {
      console.error(err)
    }
  }*/
}

export const client = new Module({
  state: ClientState,
  getters: ClientGetters,
  mutations: ClientMutations,
  actions: ClientActions
})

export const clientMapper = createMapper(client)
