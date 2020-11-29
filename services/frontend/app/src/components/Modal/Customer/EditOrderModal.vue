<template>
  <div>
    <b-modal
      id="editOrderModal"
      title="Редактирование заказа"
      size="xl"
      @ok="editOrderClick"
      @show="openFuc"
    >
      <label for="edit-name-order-textarea">Название заказа</label>
      <div id="edit-name-order-textarea">
        {{editOrder.title}}
      </div>
      <label for="edit-desc-order-textarea">Описание</label>
      <b-form-textarea
        v-model="descriptionEdited"
        no-resize
        id="edit-desc-order-textarea"
        placeholder="Введите описание заказа"
      />
      <div class="mt-1 text-o-ellipsis">Работа с данными</div>
      <div class="d-flex">
      <b-button
          class="mr-2"
          variant="secondary"
          @click="onDownloadDataOrder">
        Выгрузить данные
      </b-button>
      <b-button
          variant="secondary"
          @click="onDeleteOrder">
        Удалить заказ
      </b-button>
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" :disabled="allFill" variant="info">
          Отредактировать
        </b-button>
        <b-button @click="cancel()">
          Закрыть
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="deleteOrderModal"
      title="Предупреждение"
      ok-title="Применить"
      cancel-title="Отмена"
      size="lg"
      @ok="deleteClick"
    >
      <div>
        Вы действительно хотите удалить заказ?
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" variant="info">
          Удалить
        </b-button>
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import _ from 'lodash'
import AwesomeMask from 'awesome-mask'
import { customerMapper } from '@/store/modules/customer'
import ClientAPI from '@/api/client'

const Mappers = Vue.extend({
  computed: {
    ...customerMapper.mapState(['editOrder', 'orderList'])
  },
  methods: {
    ...customerMapper.mapMutations(['deleteOrderWithId'])
  }
})

@Component({
  directives: {
    mask: AwesomeMask
  },
  components: {
  }
})
export default class AddSpecialtiesModal extends Mappers {
  private allFill = false
  private descriptionEdited = ''
  private isEdit = false


  private async editOrderClick() {
    this.editOrder.description = this.descriptionEdited
    await ClientAPI.editCustomerOrder(this.editOrder)
  }

  private onDeleteOrder() {
    this.$bvModal.show('deleteOrderModal')
  }

  private async deleteClick() {
    this.deleteOrderWithId(this.editOrder._id.$oid)
    await ClientAPI.deleteCustomerOrder(this.editOrder._id.$oid)
    this.$bvModal.hide('editOrderModal')
  }

  private onDownloadDataOrder() {
    //TODO Отправка запроса на получение данных
  }

  private openFuc() {
    this.descriptionEdited = this.editOrder.description
  }

  private onChangeField() {
   // console.log('onChangeField')
  }

  private async created() {
    /*this.clearObj = _.clone(this.infoObj)*/
  }
}
</script>

<style lang="scss">
.divFilter {
  width: 30%;
  padding: 5px;
}
.mainDivFilter {
  display: flex;
}
label {
  margin-bottom: 0;
  margin-top: 5px;
}
</style>
