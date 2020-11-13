import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module'
import { client } from '@/store/modules/client'
import { courier } from "@/store/modules/courier";

Vue.use(Vuex)

const root = new Module({
  modules: {
    client,
    courier
  }
})

export default createStore(root)
