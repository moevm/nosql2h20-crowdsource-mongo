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
    <div class="p-3">
      <div class="w-60">
        <label for="mailUserPersonal">Почта</label>
        <b-form-input
          id="mailUserPersonal"
          :disabled="isActive"
          v-model="userInfo.email"
          placeholder="Почта"
          trim
        />
      </div>
      <div class="w-60">
        <label for="nameUserPersonal">Имя</label>
        <b-form-input
          id="nameUserPersonal"
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
          v-model="userInfo.surname"
          :disabled="isActive"
          placeholder="Фамилия"
          trim
        />
      </div>
      <div class="w-60">
        <label>Заказы:</label>
        <ag-grid-vue
          :columnDefs="columnDefsOrder"
          :gridOptions="gridOptions"
          v-model="orderList"
          class="ag-theme-alpine h-100"
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
import { userMapper } from '@/store/modules/user'
import {AgGridVue} from "ag-grid-vue";
import ActionRenderer from "@/components/table/ActionRenderer.vue";
import AgGridFactory from "@/factories/agGridFactory";
import {GridApi} from "ag-grid-community";
import {customerMapper} from "@/store/modules/customer";

const Mapper = Vue.extend({
  computed: {
    ...userMapper.mapState(['isAuthenticated', 'userInfo', 'userId']),
    ...customerMapper.mapState(['orderList'])
  },
  methods: {
    ...customerMapper.mapActions(['fetchAllOrders', 'fetchOrdersForUser'])
  }
})

@Component({
  components: { editLk,
    AgGridVue,
    ActionRenderer}
})
export default class ListOrders extends Mapper {
  private gridApi: GridApi | null = null
  private isActive = true

  private gridOptions = {
    ...AgGridFactory.getDefaultGridOptions(),
    domLayout: 'autoHeight',
    defaultColDef: {
      autoHeight: true,
      cellStyle: { 'white-space': 'normal' },
      editable: false
    },
    onGridReady: this.onGridReady
  }

  private onGridReady({ api }: { api: any }) {
    this.gridApi = api
  }

  private columnDefsOrder = [
    {
      headerName: 'Название',
      field: 'title',
      editable: false
    },
    {
      headerName: 'Описание',
      field: 'description'
    },
    {
      ...AgGridFactory.getActionColumn({
        cellRendererParams: {
          getActionByType: () => {
            return ['onDelete', 'onLink'] //this.editable ? ['onDownload', 'onDelete'] : ['onDownload']
          },
          onDelete: this.onDelete,
          onClone: this.onLink
        },
        minWidth: 140,
        editable: false,
        maxWidth: 140
      })
    }
  ]

  private onDelete() {
    //console.log('onDelete lpk')
  }

  private onLink() {
    //console.log('onLink lpk')
  }

  async created() {
    await this.fetchOrdersForUser(this.userId)
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
