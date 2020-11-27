<template>
  <div>
    <!--:src="`http://localhost:3000${pair.photo}`"-->
    <div class="d-flex" style="flex-wrap: wrap;">
      <div class="m-1 cardView">
        <div class="mr-2">
          <img
            @load="onPreviewLoad"
            class="w-100"
            :src="require(`@/assets/icons/${pair.first.image}`)"
            :style="{ height: previewHeight + 'px' }"
            style=""
            alt="Preview"
          />
        </div>
        <div class="mr-2">
          <div class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of ConfinDataValues"
              :key="index"
              v-model="pair.first.answer"
              :value="`${obj.value}`"
              @change="changeVal"
            >{{ obj.title }}</b-form-radio
            >
          </div>
        </div>
      </div>
      <div style="width: 20%;"></div>
      <div class="m-1 cardView">
        <div class="mr-2">
          <img
            @load="onPreviewLoad"
            class="w-100"
            :src="require(`@/assets/icons/${pair.second.image}`)"
            :style="{ height: previewHeight + 'px' }"
            style=""
            alt="Preview"
          />
        </div>
        <div class="mr-2">
          <div class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of ConfinDataValues"
              :key="index"
              v-model="pair.second.answer"
              :value="`${obj.value}`"
              @change="changeVal"
            >{{ obj.title }}</b-form-radio
            >
          </div>
        </div>
      </div>
    </div>
    <hr/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import Confin from "@/config/configs"
import {clientMapper} from "@/store/modules/client";

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState(['viewOrderPage'])
  },
  methods: {}
})

@Component({
  components: {}
})
export default class ViewOrderCard extends Mappers {
  @Prop(Object) pair: any
  @Prop(Number) index: any
  private selectedDataFirst = ''
  private selectedDataSecond = ''
  private ConfinDataValues = [{
                            value: 'cat',
                            title: 'Кошка'
                          },
                        {
                          value: 'dog',
                          title: 'Собака'
                        }]
  mounted() {
    console.log('pair mounted', this.pair)
  }

  private changeVal() {
    console.log('changeVal',this.viewOrderPage, this.viewOrderPage.pairs)
  }
  $refs!: {
    previewImage: HTMLImageElement
  }

  private previewHeight = 0

  private changeSelectedData() {
    //this.isText = this.selectedChangeData === 'photo'
  }

  onPreviewLoad(event: any) {
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
  }

  private onChangeField() {
    console.log('onChangeField')
  }

  private onProceedClick() {
    console.log('onProceedClick')
  }

  private onEditClick() {
    this.$bvModal.show('editOrderModal')
    console.log('onEditClick')
  }

  private onExportDataClick() {
    //TODO Отправка запроса на получение данных
    console.log('onExportDataClick')
  }

  private onStatisticClick() {
    console.log('onStatisticClick')
  }
}
</script>

<style scoped lang="scss">
.cardView{
  width: 60ch;
}
.rightSide{
  margin-left: 500px;
}
</style>
