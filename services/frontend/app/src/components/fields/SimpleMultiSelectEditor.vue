<template>
  <div style="width: max-content;">
    <MultiSelect
      placeholder="Выберите кафедры"
      v-model="value"
      ref="selector"
      :options="parsedOptions"
      :taggable="true"
      :multiple="true"
      :disabled="false"
      v-bind="ruMultiselect"
      @tag="addTag"
      @select="select"
      @remove="remove"
    >
      <template v-slot:noOptions>
        Список пуст
      </template>
      <template v-slot:noResult>
        Ничего не найдено
      </template>
    </MultiSelect>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MultiSelect from 'vue-multiselect'
import ruMultiselect from '@/i18n/ru_simple_multiselect'
import { ICellRendererParams } from 'ag-grid-community'

interface Params extends ICellRendererParams {
  [key: string]: any
}

@Component({ components: { MultiSelect } })
export default class SimpleMultiSelectEditor extends Vue {
  params!: any
  value: any = []
  options: any = []
  private ruMultiselect = ruMultiselect

  private parsedOptions: string[] = []

  private created() {
    this.value = this.params.value.map((o: any) => o.shortTitle)
    this.parsedOptions = this.params.options
      .map((o: any) => o.shortTitle)
      .sort()
  }

  private beforeDestroy() {
    ;(this.$refs.selector as any).deactivate()
  }

  public getValue() {
    return this.params.options.filter((o: any) =>
      this.value.includes(o.shortTitle)
    )
  }

  public isPopup() {
    return true
  }

  addTag(newTag: string) {
    return newTag
  }

  select(obj: any) {
    return obj
  }

  remove(obj: any) {
    return obj
  }
}
</script>
