import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module'
import { client } from '@/store/modules/client'
import { customer } from '@/store/modules/customer'

Vue.use(Vuex)

const root = new Module({
  modules: {
    client,
    customer
  }
})

export default createStore(root)
