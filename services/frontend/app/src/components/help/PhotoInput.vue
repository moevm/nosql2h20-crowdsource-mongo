<template>
  <div>
    <div class="menuDiv">
      <div>
        <h5>Данные (варианты ответов через запятую):</h5>
      </div>
      <div class="buttonAdd">
        <div style="margin-left: 10px;">
          <b-button variant="info" @click="addClick">Добавить</b-button>
        </div>
      </div>
    </div>
    <div>
      <ag-grid-vue
        :columnDefs="columnDefsFiles"
        :gridOptions="gridOptions"
        v-model="addOrder.dataManualFile"
        class="ag-theme-alpine h-100"
      />
    </div>
    <b-modal
      id="deletePhotoModal"
      title="Предупреждение"
      ok-title="Применить"
      cancel-title="Отмена"
      size="lg"
      @ok="deleteClick"
    >
      <div>
        Вы действительно хотите удалить строку данных?
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { AgGridVue } from 'ag-grid-vue'
import AgGridFactory from '@/factories/agGridFactory'
import ActionRenderer from '@/components/table/ActionRenderer.vue'
import { customerMapper } from '@/store/modules/customer'
import { GridApi } from 'ag-grid-community'

const Mapper = Vue.extend({
  computed: {
    ...customerMapper.mapState(['addOrder'])
  },
  methods: {
    ...customerMapper.mapMutations([])
  }
})
@Component({
  components: {
    AgGridVue,
    ActionRenderer
  }
})
export default class PhotoInput extends Mapper {
  private deleteParams: any = null
  private gridApi: GridApi | null = null
  private columnDefsFiles = [
    {
      headerName: 'Варианты ответов',
      placeholder: 'Названия через запятую',
      field: 'valueAnswer',
      colId: 'valueManualTitle'
    },
    {
      ...AgGridFactory.getActionColumn({
        cellRendererParams: {
          getActionByType: () => {
            return ['onLoad', 'onDelete', 'onClone'] //this.editable ? ['onDownload', 'onDelete'] : ['onDownload']
          },
          onLoad: this.onLoad,
          onDelete: this.onDelete,
          onClone: this.onClone
        },
        minWidth: 140,
        editable: false,
        maxWidth: 140
      })
    }
  ]
  private gridOptions = {
    ...AgGridFactory.getDefaultGridOptions(),
    domLayout: 'autoHeight',
    defaultColDef: {
      autoHeight: true,
      cellStyle: { 'white-space': 'normal' },
      editable: true
    },
    onGridReady: this.onGridReady
  }
  private onGridReady({ api }: { api: any }) {
    this.gridApi = api
  }

  private onLoad(params: any) {
    this.addOrder.indexManual = params.rowIndex
    document.getElementById('fileUpload')!.click()
  }
  private addClick() {
    this.addOrder.dataManualFile = this.addOrder.dataManualFile.concat({
      valueAnswer: '',
      fileValue: null
    })
    this.gridApi?.setRowData(this.addOrder.dataManualFile)
  }
  private onDelete(params: any) {
    this.deleteParams = params
    this.$bvModal.show('deletePhotoModal')
  }
  private deleteClick() {
    this.addOrder.dataManualFile = this.addOrder.dataManualFile.filter(
      (i: any, index: any) => index !== this.deleteParams.rowIndex
    )
  }
  onClone(params: any) {
    this.addOrder.dataManualFile = [
      ...this.addOrder.dataManualFile.filter(
        (i: any, index: any) => index <= params.rowIndex
      ),
      _.cloneDeep(
        this.addOrder.dataManualFile.find((i: any, index: any) => index === params.rowIndex)
      ),
      ...this.addOrder.dataManualFile.filter((i: any, index: any) => index > params.rowIndex)
    ]
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
.menuDiv {
  display: flex;
  padding: 10px;
}
.buttonAdd {
  margin: 0 0 0 auto;
}
</style>
