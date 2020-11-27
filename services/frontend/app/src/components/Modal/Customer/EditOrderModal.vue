<template>
  <div>
    <b-modal
      id="editOrderModal"
      title="Редактирование заказа"
      size="xl"
      @ok="editOrderClick"
      @show="openFuc"
    >
      <label for="edit-desc-order-textarea">Описание</label>
      <b-form-textarea
        v-model="addOrder.description"
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
import StaticData from '@/config/config'
import Confin from '@/config/configs'
import PhotoInput from '@/components/help/PhotoInput.vue'
import TextInput from "@/components/help/TextInput.vue";
import Auth from '@/views/Auth.vue'
import { customerMapper } from '@/store/modules/customer'

const Mappers = Vue.extend({
  computed: {
    ...customerMapper.mapState(['addOrder'])
  },
  methods: {}
})

@Component({
  directives: {
    mask: AwesomeMask
  },
  components: {
    PhotoInput,
    TextInput
  }
})
export default class AddSpecialtiesModal extends Mappers {
  private allFill = false
  private descriptionEdited = ''
  private isEdit = false


  private async editOrderClick() {
    console.log('editOrderClick')
  }

  private onDeleteOrder() {
    this.$bvModal.show('deleteOrderModal')
  }

  private deleteClick() {
    //TODO Отправка запроса на удаление заказа
    /*this.fileValueNoManual = null*/
  }

  private onDownloadDataOrder() {
    //TODO Отправка запроса на получение данных
  }

  private openFuc() {
    console.log('openFuc')
  }

  private onChangeField() {
    console.log('onChangeField')
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
