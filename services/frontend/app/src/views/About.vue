<template>
  <div>
    <vue-form-generator :schema="schema" :model="model" :options="options" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FormSchema, FormOptions } from 'vue-form-generator'
import Translation from '@/config/translateTable.ts'

@Component
export default class About extends Vue {
  model = {
    id: 1,
    name: 'John Doe',
    password: 'J0hnD03!x4',
    skills: ['Javascript', 'VueJS'],
    email: 'john.doe@gmail.com',
    richText: '<b>Hello!!</b>',
    status: true,
    rowData: [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]
  }

  schema: FormSchema = {
    groups: [
      {
        legend: 'User Details',
        fields: [
          {
            type: 'bootstrap',
            inputType: 'text',
            label: 'ID (disabled text field)',
            model: 'id',
            readonly: true,
            disabled: true
          },
          {
            type: 'datepicker',
            label: 'Random date',
            model: 'date'
          },
          {
            type: 'bootstrap',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            id: 'user_name',
            placeholder: 'Your name',
            featured: true,
            required: true,
            validator: 'string'
          },
          {
            type: 'CKEditor',
            label: 'Rich Text',
            model: 'richText'
          },
          {
            type: 'bootstrap',
            inputType: 'email',
            label: 'E-mail',
            model: 'email',
            placeholder: "User's e-mail address"
          },
          {
            type: 'bootstrap',
            inputType: 'password',
            label: 'Password',
            model: 'password',
            min: 6,
            required: true,
            hint: 'Minimum 6 characters',
            validator: 'string'
          }
        ]
      },
      {
        legend: 'Skills & Status',
        fields: [
          {
            type: 'bootstrapSelect',
            label: 'Skills',
            model: 'skills',
            options: ['Javascript', 'VueJS', 'CSS3', 'HTML5']
          },
          {
            type: 'multiselect',
            label: 'Random multiselect',
            model: 'random',
            options: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
            multiple: true
          },
          {
            type: 'checkbox',
            label: 'Status',
            model: 'status',
            default: true
          }
        ]
      },
      {
        legend: 'Table test',
        fields: [
          {
            type: 'agGrid',
            label: 'Grid',
            model: 'rowData',
            buttonToolbar: true,
            columnDefs: [
              { headerName: 'Make', field: 'make' },
              { headerName: 'Model', field: 'model' },
              { headerName: 'Price', field: 'price' }
            ],
            gridOptions: {
              localeText: Translation.localeTableText,
              suppressDragLeaveHidesColumns: true,
              domLayout: 'autoHeight',
              defaultColDef: {
                editable: true
              }
            }
          }
        ]
      }
    ]
  }

  options: FormOptions = {
    validateAfterLoad: true,
    validateAfterChanged: true,
    validateAsync: true
  }
}
</script>
