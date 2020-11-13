<template>
  <div
    class="d-flex flex-column justify-content-between h-100 shadow"
    @click="onPreviewClick"
  >
    <!--:src="`http://localhost:3000${product.photo}`"-->
    <div class="d-flex m-1">
      <div class="mr-2">
        <img
          @load="onPreviewLoad"
          class="w-100"
          :src="require(`@/assets/icons/${product.image}`)"
          :style="{ height: previewHeight + 'px' }"
          style=""
          alt="Preview"
        />
      </div>
      <div class="mr-2">
        <h3 class="mt-1 text-o-ellipsis news-title"><b>{{ product.title }}</b></h3>
        <h4 class="mt-1 text-o-ellipsis news-title">Описание</h4>
        <div>
          {{ product.description }}
        </div>
        <h4 class="mt-1 text-o-ellipsis news-title  ">Заказчик</h4>
        <div class="mt-1 text-o-ellipsis news-title">{{ product.customer }}</div>
        <div class="mt-2">
          <b-button @click="addProductClick()" variant="info">
            Приступить
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
@Component
export default class NewsPreview extends Vue {
  @Prop(Object) product: any

  mounted() {
    console.log('product mounted', this.product)
  }

  $refs!: {
    previewImage: HTMLImageElement
  }

  private previewHeight = 0

  onPreviewLoad(event: any) {
    console.log('onPreviewLoad',_.cloneDeep(event), event.target.clientWidth, this.previewHeight)
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
    console.log('onPreviewLoad',event.target.clientWidth, this.previewHeight)
  }

  onPreviewClick() {
    //this.$router.push(`/partner/${this.news.companyId}/news/${this.news.id}`)
  }

  private onChangeField() {
    console.log('onChangeField')
  }

  private addProductClick() {
    console.log('addProductClick')
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_colors.scss';

.text-o-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
.fieldSizeInput{
  margin-right: 2px;
}
</style>
