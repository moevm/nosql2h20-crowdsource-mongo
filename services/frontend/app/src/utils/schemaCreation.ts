import { FormSchema } from 'vue-form-generator'
import { Vue } from 'vue-property-decorator'
import _ from 'lodash'

export function createSchema(
    schema: FormSchema,
    isEditable: boolean
): FormSchema {
  if (schema.fields) {
    for (const field of schema.fields) {
      const isDisabledBefore = _.isNil(field.disabled) ? false : field.disabled
      field.disabled = isDisabledBefore || !isEditable
    }
  }
  if (schema.groups) {
    for (const group of schema.groups) {
      for (const field of group.fields) {
        const isDisabledBefore = _.isNil(field.disabled)
            ? false
            : field.disabled
        field.disabled = isDisabledBefore || !isEditable
      }
    }
  }
  return schema
}

export function updateSchemaByOriginal(
    schema: FormSchema,
    schemaOriginal: FormSchema,
    isEditable: boolean
) {
  if (schema.fields) {
    schema.fields.forEach((field, i) => {
      if (!(field && field.nonSwitchable)) {
        const isDisabledBefore =
            _.isNil(schemaOriginal.fields) ||
            _.isNil(schemaOriginal.fields[i].disabled)
                ? false
                : schemaOriginal.fields[i].disabled
        // field.disabled = isDisabledBefore || !isEditable
        Vue.set(field, 'disabled', isDisabledBefore || !isEditable)
      }
    })
  }
  if (schema.groups) {
    schema.groups.forEach((group, i) => {
      group.fields.forEach((field, j) => {
        if (!(field && field.nonSwitchable)) {
          const isDisabledBefore =
              _.isNil(schemaOriginal.groups) ||
              _.isNil(schemaOriginal.groups[i]) ||
              _.isNil(schemaOriginal.groups[i].fields[j].disabled)
                  ? false
                  : schemaOriginal.groups[i].fields[j].disabled
          Vue.set(field, 'disabled', isDisabledBefore || !isEditable)
        }
      })
    })
  }
}
