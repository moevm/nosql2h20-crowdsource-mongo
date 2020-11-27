<template>
  <div>
    <b-modal
      id="registrationModal"
      title="Регистрация"
      size="lg"
      @ok="logInClick"
      @show="openFuc"
    >
      <label for="mailUserRegistr">Почта</label>
      <b-form-input
        id="mailUserRegistr"
        :disabled="isActive"
        @input="onChangeField"
        placeholder="Почта"
        trim
      />
      <label for="nameUserRegistration">Имя</label>
      <b-form-input
        id="nameUserRegistration"
        @input="onChangeField"
        :disabled="isActive"
        placeholder="Имя"
        trim
      />
      <label for="nameUserRegistration">Фамилия</label>
      <b-form-input
        id="surnameUserRegistration"
        @input="onChangeField"
        :disabled="isActive"
        placeholder="Фамилия"
        trim
      />
      <b-form-radio-group
        id="radio-group-2"
        v-model="selectedType"
        @change="changeType"
        name="radio-sub-component"
      >
        <b-form-radio value="work">Исполнитель</b-form-radio>
        <b-form-radio value="customer">Заказчик</b-form-radio>
      </b-form-radio-group>
      <div v-if="isCustomer">
        <label for="orgUserRegistration">Организация</label>
        <b-form-input
          id="orgUserRegistration"
          @input="onChangeField"
          v-model="infoObj.organization"
          :disabled="isActive"
          placeholder="Организация"
          trim
        />
      </div>
      <label for="passwordRegistrInput">Пароль</label>
      <b-form-input id="passwordRegistrInput" type="password" trim />
      <label for="passwordRegistrInputComfirm">Подтверждение пароля</label>
      <b-form-input id="passwordRegistrInputComfirm" type="password" trim />
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" :disabled="!allFill" variant="secondary">
          Зарегистроваться
        </b-button>
        <b-button @click="cancel()" variant="secondary">
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
          Закрыть
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import AwesomeMask from 'awesome-mask'
import { checkEmail } from '@/utils/fieldValidation'
import configs from '@/config/configs'

export enum modalAction {
  create = 'Создание',
  edit = 'Редактирование'
}

const Mappers = Vue.extend({})

@Component({
  directives: {
    mask: AwesomeMask
  }
})
export default class AddSpecialtiesModal extends Mappers {
  private selectedType = ''
  private allFill = false
  private isCustomer = false
  private optionsDistr = configs.listDistricts
  private nameOkButton = 'Пригласить'
  private nameTitleModal = 'Добавление сотрудника партнера'
  private phoneMask = '+9(999)999-99-99'
  private clearObj: any = {}
  private organization: any = ''
  private isActive = false
  private isEdit = false
  private infoObj: any = {
    surname: '',
    name: '',
    organization: '',
    email: ''
  }

  private async logInClick() {
    console.log('logInClick')
  }

  private changeType(event: any) {
    console.log('changeType', event)
    this.isCustomer = event === 'customer'
  }

  private createSendObj() {
    /*const sendObj: any = {}
    sendObj.surname = this.infoObj.surname
    sendObj.name = this.infoObj.name
    sendObj.position = this.infoObj.position
    sendObj.email = this.infoObj.email
    if (this.infoObj.midname && this.infoObj.midname !== '') {
      sendObj.midname = this.infoObj.midname
    }
    if (this.infoObj.phone && this.infoObj.phone !== '') {
      sendObj.phone = this.infoObj.phone
    }
    return sendObj*/
  }

  private dropPasswordClick() {
    /*const sendObj: any = this.createSendObj()
    sendObj.userId = this.optionsEmployees.id
    PrManagerAPI.changeStaffPartner(this.organization, sendObj)*/
  }

  private checkEmail() {
    return checkEmail(this.infoObj.email)
  }

  private openFuc() {
    /*this.isActive = false
    this.isEdit = false
    if (this.optionsEmployees.status === partnerStatus.active) {
      this.isActive = true
      this.nameOkButton = 'Сбросить пароль'
      this.nameTitleModal = 'Редактирование активного сотрудника партнера'
      this.fillModal()
    }
    if (this.optionsEmployees.action === modalAction.create) {
      this.infoObj = _.clone(this.clearObj)
      this.organization = ''
      this.nameOkButton = 'Пригласить'
      this.nameTitleModal = 'Добавление сотрудника партнера'
    }
    if (
        this.optionsEmployees.action === modalAction.edit &&
        this.optionsEmployees.status === partnerStatus.invited
    ) {
      this.nameOkButton = 'Отправить повторно'
      this.nameTitleModal = 'Редактирование сотрудника партнера'
      this.isEdit = true
      this.fillModal()
    }*/
  }

  private fillModal() {
    /*this.infoObj.surname = this.optionsEmployees.surname
    this.infoObj.name = this.optionsEmployees.name
    this.infoObj.midname = this.optionsEmployees.midname
    this.infoObj.position = this.optionsEmployees.position
    this.infoObj.email = this.optionsEmployees.email
    this.infoObj.phone = this.optionsEmployees.phone
    this.organization = this.optionsEmployees.idCompany
    this.onChangeField()*/
  }

  private onChangeField() {
    /*this.allFill =
        this.infoObj.surname !== '' &&
        this.infoObj.name !== '' &&
        this.organization !== '' &&
        this.infoObj.email !== '' &&
        this.checkEmail()*/
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
