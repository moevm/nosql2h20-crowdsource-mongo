<template>
  <div>
    <div v-for="(pair, index) of viewOrderPage.pairs" :key="index">
      <ViewOrderCard :pair="pair" :index="index" />
    </div>
    <div class="menuDiv">
      <div class="buttonAdd">
        <b-button variant="info" @click="endProcessed" :disabled="!allFilled"
          >Отправить данные</b-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { clientMapper } from '@/store/modules/client'
import ViewOrderCard from '@/components/help/ViewOrderCard.vue'
import _ from 'lodash'
import ClientAPI from '@/api/client'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState([
      'viewOrderPage',
      'selectOrder',
      'fullInfoOrder',
      'allFilled'
    ])
  },
  methods: {}
})

@Component({
  components: {
    ViewOrderCard
  }
})
export default class CatalogProduct extends Mappers {
  private async endProcessed() {
    for (const item of this.viewOrderPage.pairs) {
      if (item.first) {
        this.fullInfoOrder.data[`${item.first.mainObj}`][
          `${item.first.selected}`
        ]++
      }
      if (item.second) {
        this.fullInfoOrder.data[`${item.second.mainObj}`][
          `${item.second.selected}`
        ]++
      }
    }
    const sendObj: any = { data: this.fullInfoOrder.data }
    sendObj['data_type'] = this.fullInfoOrder.data_type
    await ClientAPI.editWorkerOrder(sendObj, this.selectOrder._id.$oid)
    this.$router.push('/main/work')
  }

  async created() {
    const inputArr: any[] = [] //Config.orderList
    for (const key in this.fullInfoOrder.data) {
      const keyAnswer: any[] = []
      for (const keySup in this.fullInfoOrder.data[`${key}`]) {
        keyAnswer.push(keySup)
      }
      const tmpObj: any = {
        mainObj: key,
        selected: '',
        answers: keyAnswer,
        type: this.selectOrder.data_type
      }
      inputArr.push(tmpObj)
    }
    const pairsArray: any[] = []
    for (let i = 0; i < inputArr.length; i += 2) {
      let first = null
      let second = null
      if (!_.isNil(inputArr[i])) {
        first = inputArr[i]
      }
      if (!_.isNil(inputArr[i + 1])) {
        second = inputArr[i + 1]
      }
      pairsArray.push({
        first: !_.isNil(first) ? { ...first /*,answer: ''*/ } : null,
        second: !_.isNil(second) ? { ...second /*,answer: ''*/ } : null
      })
    }
    this.viewOrderPage.pairs = pairsArray
  }
}
</script>

<style lang="scss" scoped>
.menuDiv {
  display: flex;
  padding: 5px;
}
.buttonAdd {
  margin: 0 0 0 auto;
}
</style>
