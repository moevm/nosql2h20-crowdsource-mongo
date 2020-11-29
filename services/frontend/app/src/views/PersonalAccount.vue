<template>
  <div class="mt-2">
    <div class="registrationButton">
      <b-button
        @click="editProfileClick()"
        class="mr-2 btn-primary-outline"
        variant="info"
      >
        Редактировать профиль
      </b-button>
    </div>
    <div>
      <div class="w-60">
        <label for="mailUserPersonal">Почта</label>
        <b-form-input
          id="mailUserPersonal"
          :disabled="isActive"
          v-model="userInfo.email"
          @input="onChangeField"
          placeholder="Почта"
          trim
        />
      </div>
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
    </div>
    <editLk />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'
import Translation from '@/config/translateTable.ts'
import editLk from '@/components/Modal/lkUser/editLk.vue'

const Mapper = Vue.extend({
  computed: {}
})

@Component({
  components: { editLk }
})
export default class ListOrders extends Mapper {
  private modelGrid: any = Config.ListOrders
  private deleteParams: any = {}
  private userInfo = {
    name: 'Иван',
    surname: 'Иванов',
    email: 'ivan@mail.ru'
  }
  private isActive = true

  private gridOptions = {
    localeText: Translation.localeTableText,
    suppressDragLeaveHidesColumns: true,
    domLayout: 'autoHeight',
    defaultColDef: {
      editable: false,
      filter: true,
      sortable: true
    }
  }

  private addClick() {
    this.$bvModal.show('addPartnerDisciplineModal')
  }

  async created() {
    /*this.filterCatalogSchema.fields![0].options = this.filterProduct
    console.log('Create catalog', this.productList)*/
  }

  private onChangeField() {
    /*this.allFill =
        this.infoObj.surname !== '' &&
        this.infoObj.name !== '' &&
        this.organization !== '' &&
        this.infoObj.email !== '' &&
        this.checkEmail()*/
  }

  private editProfileClick() {
    this.$bvModal.show('editLkModal')
  }
}
</script>

<style lang="scss" scoped>
.swiper-size {
  height: 30%;
  display: flex;
}
.textMainView {
  font-size: 18px;
}
.agGridDisClass {
  height: 500px;
  overflow: scroll;
}
.registrationButton {
  text-align: right;
}
</style>
