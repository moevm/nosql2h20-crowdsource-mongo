/*
import { documentRightsTranslation } from '@/api/permissions/AbilityBuilder'
import _ from 'lodash'
import { User } from '@/api/user'
import ChartsConfig from '@/config/charts/charts'

export function getSpecialityFullName(
  directionTitle: string,
  directionCode: string,
  department: any
) {
  if (directionTitle || directionCode) {
    const depText =
      department && department.shortTitle ? department.shortTitle : null
    const facultyText =
      department && department.faculty && department.faculty.shortTitle
        ? department.faculty.shortTitle
        : null
    let postfix = ''
    if (depText && facultyText) {
      postfix = ` - ${depText} (${facultyText})`
    } else if (depText && !facultyText) {
      postfix = ` - ${depText}`
    } else if (!depText && facultyText) {
      postfix = ` - ${facultyText}`
    } else {
      postfix = ''
    }

    return `${directionCode} ${directionTitle ? directionTitle : ''} ${postfix}`
  } else {
    return `Выберите значение`
  }
}

export function getUserText(user: User | null) {
  if (_.isNil(user)) {
    return ''
  }
  let str = user.initials
  if (!str) {
    str = `${user.surname} ${user.name[0]}.${
      user.midname ? user.midname[0] + '.' : ''
    }`
  }
  if (user.userDepartments?.length > 0) {
    str += ` (${user.userDepartments
      .map(ud => {
        return `${ud.workDepartment.shortTitle ??
          ud.workDepartment.title} - ${ud.workPosition.shortTitle ??
          ud.workPosition.title}`
      })
      .join(', ')})`
  } else if (user.aisDepartments?.length > 0) {
    str += ` (${user.aisDepartments?.map(d => d.shortTitle).join(', ')})`
  }
  if (user.actualUser) {
    str += ` [${getUserText(user.actualUser)}]`
  }
  return str
}

export function createOptionsFromSpecialities(
  specialities: any[],
  withPlans?: boolean
) {
  return specialities.map((s: any) => ({
    id: s.id,
    directionCode: s.cipher,
    directionTitle: s.title,
    studentQualification: s.qualification,
    studyingLevel: s.studyLevel?.title,
    studyingForm: s.studyForm?.title,
    studyingYears: s.studyPeriod,
    department: {
      ...s.department,
      ...(s.faculty ? { faculty: s.faculty } : {})
    },
    departmentOriginal: {
      ...s.department,
      ...(s.faculty ? { faculty: s.faculty } : {})
    },
    plans: '',
    plansRaw: withPlans ? s.plans : []
  }))
}

export function translateRights(rights?: string[]): string[] {
  if (rights) {
    return rights.map((r: string) => documentRightsTranslation[r])
  } else return []
}

export function reverseTranslateRights(rights?: string[]): string[] {
  if (rights) {
    return rights.map(
      (r: string) =>
        Object.keys(documentRightsTranslation).filter(
          key => documentRightsTranslation[key] === r
        )[0]
    )
  } else return []
}

export function parseTimestampForChat(datetime: string) {
  const dt = new Date(datetime)
  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
    second: dt.getSeconds(),
    millisecond: dt.getMilliseconds()
  }
}

export function generateListHTMLRights(rights?: string[]) {
  let result = ''
  if (rights && rights.length) {
    result += '<ul>'
    for (const right of rights) {
      result += `<li>${right}</li>`
    }
    result += '</ul>'
    return result
  }
  return '-'
}

export function isNumeric(value: string) {
  return /^-{0,1}\d+$/.test(value)
}

export function arrayRotate(arr: any[], count: number) {
  return arr.concat(arr.splice(0, count))
}

export function translateMonth(array: string[]) {
  return array.map(month => (ChartsConfig.monthTranslations as any)[month])
}
*/
