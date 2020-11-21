<template>
  <div>
    <b-modal
      id="addOrderModal"
      title="Добавление заказа"
      size="xl"
      @ok="addOrderClick"
      @show="openFuc"
    >
      <div class="w-60 d-flex">
        <label for="nameOrder">Название заказа</label>
        <b-form-input
          id="nameOrder"
          @input="onChangeField"
          v-model="orderInfo.nameOrder"
          :disabled="isActive"
          placeholder="Название заказа"
          trim
        />
      </div>
      <label for="desc-order-textarea">Описание</label>
      <b-form-textarea
        :value="orderInfo.description"
        no-resize
        id="desc-order-textarea"
        placeholder="Введите описание заказа"
      />
      <div class="mt-1 text-o-ellipsis">Данные для заказа</div>
      <div class="d-flex">
        <div>
          <b-form-radio-group id="radio-group-2" v-model="selected " name="radio-sub-component">
            <b-form-radio value="work">Исполнитель</b-form-radio>
            <b-form-radio value="customer">Заказчик</b-form-radio>
          </b-form-radio-group>
        </div>
        <div class="ml-1 w-15">
          <b-form-checkbox-group
            v-model="checkManualInput"
            :options="arrayManualCheckbox"
            name="flavour-2a"
            stacked
          ></b-form-checkbox-group>
        </div>
      </div>
      <div v-if="checkManualInput">
        не пусто
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" :disabled="allFill" variant="info">
          Изменить
        </b-button>
        <b-button @click="cancel()">
          Закрыть
        </b-button>
      </template>
    </b-modal>
    <b-modal
      id="dropPasswordModal"
      title="Сброс пароля"
      size="lg"
      @ok="dropPasswordClick"
    >
      <div>
        На вашу почту будет отправлен сгенерированный пароль!
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" variant="primary">
          Сбросить пароль
        </b-button>
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import AwesomeMask from 'awesome-mask'
import Config from '@/config/config'

const Mappers = Vue.extend({})

@Component({
  directives: {
    mask: AwesomeMask
  }
})
export default class AddSpecialtiesModal extends Mappers {
  private allFill = false
  private isActive = false
  private isEdit = false
  private checkManualInput = []
  private arrayManualCheckbox = Config.manualInput
  private orderInfo = {
    nameOrder: '',
    description: ''
  }

  private async addOrderClick() {
    console.log('addOrderClick')
  }

  private dropPasswordClick() {
    /*const sendObj: any = this.createSendObj()
    sendObj.userId = this.optionsEmployees.id
    PrManagerAPI.changeStaffPartner(this.organization, sendObj)*/
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
