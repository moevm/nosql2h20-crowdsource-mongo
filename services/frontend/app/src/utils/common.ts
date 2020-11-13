import Config from '@/config/config'
import _ from 'lodash'

export function getFieldStyle(
  style: string,
  width: number,
  newStyle?: string
): string {
  return width < Config.mobileWidth
    ? style.replace(/w-\d+/g, newStyle ? newStyle : 'w-100')
    : style
}

export function toMobile(schema: any, width: number) {
  if (schema.fields) {
    for (const field of schema.fields) {
      if (field && field.styleClasses) {
        field.styleClasses = getFieldStyle(field.styleClasses, width)
      }
    }
  }

  if (schema.groups) {
    for (const group of schema.groups) {
      for (const field of group.fields) {
        if (field && field.styleClasses) {
          field.styleClasses = getFieldStyle(field.styleClasses, width)
        }
      }
    }
  }
  if (_.isArray(schema)) {
    for (const field of schema) {
      if (field && field.styleClasses) {
        field.styleClasses = getFieldStyle(field.styleClasses, width)
      }
    }
  }
  return schema
}
