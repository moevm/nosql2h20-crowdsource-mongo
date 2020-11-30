/// <reference types="node" />

declare module 'vue-form-generator' {
  import { PluginObject } from 'vue'

  export interface GenField {
    type: string
    label: string
    model: string
    id?: any

    inputName?: string
    featured?: boolean
    visible?: boolean
    disabled?: boolean
    required?: boolean
    multi?: boolean
    default?: any
    hint?: string
    help?: string
    validator?: Function | Function[] | string
    validateDebounceTime?: number
    buttons?: any[]
    attributes?: any

    onChanged?: (model: any, newVal: any, oldVal: any, field: any) => void
    onValidated?: (model: any, errors: any, field: any) => void

    [key: string]: any
  }

  export interface Group {
    legend: string
    fields: GenField[]
  }

  export interface FormSchema {
    fields?: GenField[]
    groups?: Group[]
  }

  export interface FormOptions {
    validateAfterLoad?: boolean
    validateAfterChanged?: boolean
    fieldIdPrefix?: string
    validateAsync?: boolean
    validationErrorClass?: string
    validationSuccessClass?: string
    validateDebounceTime?: number
  }

  export const abstractField: any

  const VueFormGenerator: PluginObject<any>
  export default VueFormGenerator
}
