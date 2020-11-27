<!--
<template>
  <div class="d-flex flex-row w-100">
    <b-form-input
      :value="text"
      :placeholder="schema.placeholder"
      readonly
      class="mr-1"
    />
    <b-button @click="onSelect">
      <font-awesome-icon
        :icon="isMultiple ? ['fas', 'plus'] : ['das', 'user']"
      />
    </b-button>
    <b-button @click="onReset">
      <font-awesome-icon :icon="['fa', 'times']" />
    </b-button>
    <b-modal title="Выбор пользователя" ref="userModal" size="xl">
      <UsersTable
        :dataSource="schema.dataSource"
        :onDoubleClickCallback="onDoubleClick"
        :isDisplayHeader="false"
        :onEditCallback="null"
        :isDisplayRoles="true"
        :isDisplayDepartments="true"
      />
      <template v-slot:modal-footer="{ cancel }">
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
    <b-modal
      title="Удаление пользователя"
      ref="deleteModal"
      size="xl"
      v-if="isMultiple"
    >
      <UsersTable
        :isDisplayHeader="false"
        :isDisplayRoles="true"
        :isDisplayDepartments="true"
        :rowData="value"
        :actions="['delete']"
        @delete="onMultipleDelete"
      />

      <template v-slot:modal-footer="{ cancel }">
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { BModal } from 'bootstrap-vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { abstractField, GenField } from 'vue-form-generator'
import _ from 'lodash'

import UsersTable from '@/components/admin/UsersTable.vue'
import { User } from '@/api/user'
import { getUserText } from '@/utils/formatter'
import { ICellRendererParams } from 'ag-grid-community'

@Component({ components: { UsersTable } })
export default class UserPicker extends Mixins(abstractField) {
  schema!: GenField
  value!: User | User[] | null
  text = ''
  key = 0

  $refs!: { userModal: BModal; deleteModal: BModal }

  @Watch('value')
  private updateText(newValue: User | User[] | null) {
    if (!this.isMultiple) {
      this.text = getUserText(newValue as User)
    } else if (newValue) {
      this.text = (newValue as User[]).map(val => getUserText(val)).join(', ')
    } else {
      this.text = ''
    }
  }

  private created() {
    this.updateText(this.value)
  }

  private get isMultiple() {
    return this.schema.isMultiple ?? false
  }

  private onReset() {
    if (this.isMultiple) {
      this.$refs.deleteModal.show()
    } else {
      this.value = null
      this.updateText(this.value)
    }
  }

  private onSelect() {
    this.$refs.userModal.show()
  }

  private onMultipleDelete(params: ICellRendererParams) {
    this.value = (this.value as User[]).filter(v => v.id !== params.data.id)
    this.updateText(this.value)
  }

  private onDoubleClick(node: any) {
    if (this.isMultiple) {
      if (!_.isArray(this.value)) {
        this.$set(this, 'value', [])
      } else {
        if (this.value.find(u => u.id === node.data.id)) {
          return
        }
      }
      ;(this.value as User[]).push(node.data)
      ;(this.value as User[]).sort((a, b) => (a.surname > b.surname ? 1 : -1))
    } else {
      this.$set(this, 'value', node.data)
    }
    this.$refs.userModal.hide()
    this.updateText(this.value)
  }
}
</script>
-->
