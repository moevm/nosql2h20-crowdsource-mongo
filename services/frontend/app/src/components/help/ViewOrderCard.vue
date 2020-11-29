<template>
  <div>
    <!--:src="`http://localhost:3000${pair.photo}`"-->
    <div class="d-flex ml-5" style="flex-wrap: wrap;">
      <div v-if="pair.first" class="m-1 cardView">
        <div class="mr-2">
          {{pair.first.mainObj}}
          <!--<img
            @load="onPreviewLoad"
            class="w-100"
            :src="require(`@/assets/icons/${pair.first.image}`)"
            :style="{ height: previewHeight + 'px' }"
            style=""
            alt="Preview"
          />-->
        </div>
        <div class="mr-2">
          <div class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of pair.first.answers"
              :key="index"
              v-model="pair.first.selected"
              :state="!!pair.first.selected.length"
              :value="`${obj}`"
              @change="changeValFirst"
            >{{ obj }}</b-form-radio
            >
          </div>
        </div>
      </div>
      <div style="width: 17%;"></div>
      <div v-if="pair.second" class="m-1 cardView">
        <div class="mr-2">
          {{pair.second.mainObj}}
          <!--<img
            @load="onPreviewLoad"
            class="w-100"
            :src="require(`@/assets/icons/${pair.second.image}`)"
            :style="{ height: previewHeight + 'px' }"
            style=""
            alt="Preview"
          />-->
        </div>
        <div class="mr-2">
          <div class="d-flex">
            <b-form-radio
              class="mr-3"
              v-for="(obj, index) of pair.second.answers"
              :key="index"
              :state="!!pair.second.selected.length"
              v-model="pair.second.selected"
              :value="`${obj}`"
              @change="changeValSecond"
            >{{ obj }}</b-form-radio
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
  methods: {
    ...clientMapper.mapMutations(['checkFill'])
  }
})

@Component({
  components: {}
})
export default class ViewOrderCard extends Mappers {
  @Prop(Object) pair: any
  @Prop(Number) index: any

  private changeValFirst(event: any) {
    this.pair.first.selected = event
    this.checkFill()
  }
  private changeValSecond(event: any) {
    this.pair.second.selected = event
    this.checkFill()
  }
  $refs!: {
    previewImage: HTMLImageElement
  }

  private previewHeight = 0

  onPreviewLoad(event: any) {
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
  }

/*  private onChangeField() {
    console.log('onChangeField')
  }*/

  private onExportDataClick() {
    //TODO Отправка запроса на получение данных
    //console.log('onExportDataClick')
  }

  private onStatisticClick() {
  // console.log('onStatisticClick')
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
