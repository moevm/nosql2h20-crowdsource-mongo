<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'
import { customerMapper } from '@/store/modules/customer'
import StatisticAPI from '@/api/statistic'
import VueCharts from 'vue-chartjs'
import { Pie, mixins } from 'vue-chartjs';

const Mappers = Vue.extend({
  extends: Pie,
  mixins: [mixins.reactiveProp],
  computed: {
    ...customerMapper.mapState(['editOrder'])
  }
})

@Component({
})
export default class StatisticUsers extends Mappers{
  private isChart = false
  public renderChart!: (chartData: any, options?: any) => void
  async mounted () {
    // Overwriting base render method with actual data.
    const data = (await StatisticAPI.getUserStatistic(this.editOrder._id.$oid)).data
    const keyAnswer: any[] = []
    const valAnswer: any[] = []
    for (const keySup in data) {
      keyAnswer.push(keySup === 'started' ? 'Начали' : 'Закончили')
      //valAnswer.push(5)
      valAnswer.push(data[keySup])
    }
    for (const item of valAnswer) {
      console.log('item user', item, item > 0)
      if (item > 0) {
        this.isChart = true
        break
      }
    }
    if (!this.isChart) {
      keyAnswer.push('Не приступили')
      valAnswer.push(100)
    }
    console.log('data user', data, keyAnswer, valAnswer)
    this.renderChart({
      labels: keyAnswer,
      datasets: [
        {
          backgroundColor: [
            '#f87979',
            '#aef879',
            '#79a8f8'
          ],
          data: valAnswer
        }
      ]
    })
  }
  async created() {
    //console.log('selectOrder', this.editOrder)
    //console.log('created stats', (await StatisticAPI.geAnswerStatistic(this.editOrder._id.$oid)).data, (await StatisticAPI.getUserStatistic(this.editOrder._id.$oid)).data)
  }
}
</script>

<style lang="scss" scoped>
.swiper-size {
  height: 30%;
  display: flex;
}
.textMainView {
  font-size: 18px;
}
.catalogList {
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
}
.addOrderClass {
  text-align: right;
}
</style>
