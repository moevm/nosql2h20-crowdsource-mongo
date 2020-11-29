<template>
  <div>
    <b-modal
      id="editLkModal"
      title="Настройка профиля"
      size="lg"
      @ok="editLkClick"
      @show="openFuc"
    >
      <b-tabs variant="info">
        <b-tab title="Редактирование профиля" active>
          <div class="w-60">
            <label for="nameUserPersonal">Имя</label>
            <b-form-input
              id="nameUserPersonal"
              @input="onChangeField"
              v-model="userInfo.name"
              :disabled="isActive"
              placeholder="Имя"
              trim
            />
          </div>
          <div class="w-60">
            <label for="surnameUserPersonal">Фамилия</label>
            <b-form-input
              id="surnameUserPersonal"
              @input="onChangeField"
              v-model="userInfo.surname"
              :disabled="isActive"
              placeholder="Фамилия"
              trim
            />
          </div>
        </b-tab>
        <b-tab title="Смена пароля">
          <label for="passwordOldUserLk">Старый пароль</label>
          <b-form-input id="passwordOldUserLk" type="password"  :disabled="isActive" trim />
          <label for="passwordUserLk">Пароль</label>
          <b-form-input id="passwordUserLk" type="password"  :disabled="isActive" trim />
          <label for="passwordUserLk">Подтверждение пароля</label>
          <b-form-input id="passwordUserLk" type="password" :disabled="isActive"  trim />
        </b-tab>
      </b-tabs>
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
import { checkEmail } from '@/utils/fieldValidation'
import configs from '@/config/configs'
import {userMapper} from "@/store/modules/user";

const Mappers = Vue.extend({
  computed: {
    ...userMapper.mapState(['isAuthenticated', 'userInfo'])
  }
})

@Component({
  directives: {
    mask: AwesomeMask
  }
})
export default class EditLk extends Mappers {
  private allFill = false
  private isActive = true

  private async editLkClick() {
    //console.log('editLkClick')
  }

  private dropPasswordClick() {
    /*const sendObj: any = this.createSendObj()
    sendObj.userId = this.optionsEmployees.id
    PrManagerAPI.changeStaffPartner(this.organization, sendObj)*/
  }

  private openFuc() {
    //console.log('openFuc')
  }

  private onChangeField() {
    //console.log('onChangeField')
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
