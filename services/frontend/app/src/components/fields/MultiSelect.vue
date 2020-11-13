<template>
  <MultiSelect
    v-model="value"
    :options="schema.options"
    :taggable="schema.taggable"
    :disabled="disabled"
    :label="schema.multiselectLabel"
    v-bind="options"
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
    <template v-slot:maxElements>
      Выбрано максимальное количество результатов
    </template>
  </MultiSelect>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { abstractField } from 'vue-form-generator'
import MultiSelect from 'vue-multiselect'
import _ from 'lodash'
import { schemaAttributes } from '@/utils/schema'
import { GenField } from 'vue-form-generator'
import ruMultiselect from '@/i18n/ru_multiselect'
import ruMultiselectSimple from '@/i18n/ru_simple_multiselect'
import Config from '@/config/config'

@Component({ components: { MultiSelect } })
export default class MultiselectField extends Mixins(abstractField) {
  schema!: GenField
  value!: any

  private width = Config.defaultWidth

  get options() {
    return {
      ...(this?.width ?? Config.defaultWidth < Config.mobileWidth
          ? ruMultiselectSimple
          : ruMultiselect),
      ..._.omit(this.schema, [...schemaAttributes, 'methods'])
    }
  }

  addTag(newTag: string) {
    if (this.schema.addTag) {
      return this.schema.addTag(newTag)
    } else {
      if (this.value) {
        this.value = [...this.value, newTag]
      } else {
        this.value = [newTag]
      }
    }
  }

  select(obj: any) {
    if (this.schema.select) {
      this.schema.select(obj)
    }
  }

  remove(obj: any) {
    if (this.schema.remove) {
      this.schema.remove(obj)
    }
  }

  private created() {
    this.width = window?.innerWidth ?? Config.defaultWidth
  }
}
</script>
