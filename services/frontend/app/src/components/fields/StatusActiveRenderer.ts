import _ from 'lodash'

const style = `
  margin-left: 3px;
`

export default class StatusActiveRenderer {
  private eGui: any

  init(params: any) {
    this.eGui = document.createElement('div')
    if (_.isNil(params.value)) {
      return
    }
    const status = params.value ? 'active' : 'block'
    this.eGui.innerHTML = `
        <div
          class="Badge_${status}"
          style="${style}" title="${params.value ? 'Активен' : 'Заблокирован'}">
          ${params.value ? 'А' : 'Б'}
        </div>`
  }

  getGui() {
    return this.eGui
  }
}
