<template>
  <div>
    <!--<div class="addOrderClass">
      <b-button class="mr-1" @click="addOrderClick()" variant="info">
        Добавить заказ
      </b-button>
    </div>-->
    <div v-for="(pair, index) of viewOrderPage.pairs" :key="index">
      <ViewOrderCard :pair="pair" :index="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Config from '@/config/config'
import MultiSelect from 'vue-multiselect'
import { clientMapper } from '@/store/modules/client'
import ruMultiselect from '@/i18n/ru_multiselect'
import ViewOrderCard from "@/components/help/ViewOrderCard.vue";
import _ from 'lodash'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState(['viewOrderPage'])
  },
  methods: {}
})

@Component({
  components: {
    MultiSelect,
    ViewOrderCard
  }
})
export default class CatalogProduct extends Mappers {
  private pairsArray: any[] = []
  private ruMultiselect = ruMultiselect

  private customLabelProdiucts({ name }: any) {
    if (name) {
      return name
    } else {
      return `Выберите значение`
    }
  }

  private addOrderClick() {
    this.$bvModal.show('addOrderModal')
    console.log('addOrderClick')
  }

  async created() {
    console.log('Create catalog', this.pairsArray)
    const inputArr = Config.orderList
    const pairsArray: any[] = []
    for (let i = 0; i < inputArr.length; i += 2) {
      let first = null
      let second = null
      if (!_.isNil(inputArr[i])) {
        first = inputArr[i]
      }
      if (!_.isNil(inputArr[i+1])) {
        second = inputArr[i+1]
      }
      pairsArray.push({
        first: {...first,answer: ''},
        second: {...second,answer: ''}
      })
    }
    this.viewOrderPage.pairs = pairsArray
    /*console.log('Create catalog', this.productList)
    //await this.fetchCatalogClient()
    console.log('created after', this.clientCatalog)
    //await this.fetchProductClient(this.clientCatalog[0].id)
    this.setFilterCatalog(this.clientCatalog[0])
    this.selectFilterCatalog = this.clientCatalog[0]
    this.productList = this.allProduct
    this.filterProduct = this.clientCatalog
    console.log('Create catalog ends', this.clientCatalog, this.allProduct)*/
  }
}
</script>

<style lang="scss" scoped>
.catalogList {
  height: 220vh;
}
</style>
