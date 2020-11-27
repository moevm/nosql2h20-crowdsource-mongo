<template>
  <div class="authCard">
    <div class="w-100 p-2">
      <label for="nameUserAuth">Email</label>
      <b-form-input
        id="nameUserAuth"
        @input="onChangeField"
        v-model="authData.login"
        placeholder="Имя"
        trim
      />
    </div>
    <div class="w-100 p-2">
      <label for="surnameUserAuth">Пароль</label>
      <b-form-input
        id="surnameUserPersonal"
        type="password"
        @input="onChangeField"
        v-model="authData.password"
        placeholder="Пароль"
        trim
      />
    </div>
    <div class="d-flex authButton mt-2">
      <b-button
        @click="loginClick()"
        class="mr-2 btn-primary-outline"
        variant="secondary"
      >
        Вход
      </b-button>
      <b-button
        @click="registrationClick()"
        class="mr-2 btn-primary-outline"
        variant="secondary"
      >
        Регистрация
      </b-button>
    </div>
    <b-link class="authLink" href="/main">Забыли пароль?</b-link>
    <Registration />
    <br />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Registration from '@/components/Modal/Auth/Registration.vue'

const Mapper = Vue.extend({
  computed: {}
})

@Component({
  components: {
    Registration
  }
})
export default class Auth extends Mapper {
  private authData = {
    login: '',
    password: ''
  }

  async created() {
    console.log('created main')
    /*this.swiperComponentOption.slidesPerView =
        this.width < this.mobileWidth ? 1 : 3
      this.swiperComponentOption.slidesPerGroup =
        this.width < this.mobileWidth ? 1 : 3*/
  }
  private onChangeField() {
    /*this.allFill =
        this.infoObj.surname !== '' &&
        this.infoObj.name !== '' &&
        this.organization !== '' &&
        this.infoObj.email !== '' &&
        this.checkEmail()*/
  }
  private registrationClick() {
    console.log('registrationClick')
    this.$bvModal.show('registrationModal')
  }
  private loginClick() {
    console.log('loginClick')
  }
}
</script>

<style lang="scss" scoped>
.authCard {
  border: solid black 1px;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}
.authButton {
  width: 20%;
  margin-left: 40%;
  margin-right: 40%;
}
.authLink {
  width: 15%;
  margin-left: 45%;
}
</style>
