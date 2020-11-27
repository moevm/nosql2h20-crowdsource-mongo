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
        <h3 class="mt-1 text-o-ellipsis">
          <b>{{ product.title }}</b>
        </h3>
        <h4 class="mt-1 text-o-ellipsis">Описание</h4>
        <div>
          {{ product.description }}
        </div>
        <h4 class="mt-1 text-o-ellipsis">Заказчик</h4>
        <div class="mt-1 text-o-ellipsis">{{ product.customer }}</div>
        <div class="d-flex">
          <h4 class="mt-1 text-o-ellipsis">Дата добавления</h4>
          <div class="mt-2 text-o-ellipsis">
            <!--{{ product.customer }}-->14.11.2020
          </div>
        </div>
        <div class="mt-2 d-flex">
          <b-button class="mr-1" @click="onProceedClick()" variant="info">
            Приступить
          </b-button>
          <b-button class="mr-1" @click="onEditClick()" variant="info">
            Редактировать
          </b-button>
          <b-button class="mr-1" @click="onExportDataClick()" variant="info">
            Выгрузить данные
          </b-button>
          <b-button class="mr-1" @click="onStatisticClick()" variant="info">
            Статистика
          </b-button>
        </div>
      </div>
    </div>
    <EditOrderModal />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import EditOrderModal from "@/components/Modal/Customer/EditOrderModal.vue";

@Component({
  components: {
    EditOrderModal
  }
})
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
    console.log(
      'onPreviewLoad',
      _.cloneDeep(event),
      event.target.clientWidth,
      this.previewHeight
    )
    this.previewHeight = event.target.clientWidth * 0.5625 // 0.5625 = 9/16 => Соотношение сторон: 16:9
    console.log('onPreviewLoad', event.target.clientWidth, this.previewHeight)
  }

  onPreviewClick() {
    //this.$router.push(`/partner/${this.news.companyId}/news/${this.news.id}`)
  }

  private onChangeField() {
    console.log('onChangeField')
  }

  private onProceedClick() {
    this.$router.push('/main/work/task')
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
@import '@/scss/_colors.scss';
.text-o-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
.fieldSizeInput {
  margin-right: 2px;
}
</style>
