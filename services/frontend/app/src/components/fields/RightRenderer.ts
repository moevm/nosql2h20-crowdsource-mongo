/*
import _ from 'lodash'
import {
  documentRightsBadgeShortName,
  documentRightsTranslation
} from '@/api/permissions/AbilityBuilder'

const style = `
  margin-left: 3px;
`

export default class RightRenderer {
  private eGui: any

  init(params: any) {
    this.eGui = document.createElement('span')
    let text = ''
    if (_.isNil(params.value)) {
      return
    }

    const types: any = params.value.sort()

    for (const type of types) {
      text += `
        <div
          class="Badge_${type}"
          style="${style}" title="${documentRightsTranslation[type]}">
          ${documentRightsBadgeShortName[type]}
        </div>
        `
    }
    this.eGui.innerHTML = text
  }

  getGui() {
    return this.eGui
  }
}
*/
