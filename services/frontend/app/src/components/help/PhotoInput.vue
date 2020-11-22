<template>
  <div>
    <ag-grid-vue
      :columnDefs="columnDefsFiles"
      :gridOptions="gridOptions"
      :rowData="rowDataOtherFiles"
      class="ag-theme-alpine h-100"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import _ from 'lodash'
import { AgGridVue } from 'ag-grid-vue'
import AgGridFactory from '@/factories/agGridFactory'
import ActionRenderer from '@/components/table/ActionRenderer.vue'

const Mapper = Vue.extend({
  computed: {
  }
})

@Component({
  components: {
    AgGridVue,
    ActionRenderer
  }
})
export default class PhotoInput extends Mapper {
  private rowDataOtherFiles = ['']
  private columnDefsFiles = [
    {
      headerName: 'Варианты ответов',
      placeholder: 'Названия через запятую',
      field: 'valueManualTitle',
      colId: 'valueManualTitle'
    },
    {
      ...AgGridFactory.getActionColumn({
        cellRendererParams: {
          getActionByType: () => {
            return ['onLoad', 'onDelete'] //this.editable ? ['onDownload', 'onDelete'] : ['onDownload']
          },
          onLoad: (e: any) => {
            console.log('___onLoad', e)
            document.getElementById("fileUpload")!.click()
          },
          onDelete: (e: any) => {
            console.log(e)
          }
        },
        minWidth: 140,
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
      editable: false,
      sortable: true,
      filter: false,
      resizable: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/scss/_colors.scss';
.text-o-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
}
.fieldSizeInput{
  margin-right: 2px;
}
</style>
