import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* Bootstrap */
import { BootstrapVue } from 'bootstrap-vue'
Vue.use(BootstrapVue)

/* Fonts Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
// TODO extract library for production
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* Form Generator */
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
Vue.use(VueFormGenerator)

/* Custom Field */
import BootstrapField from '@/components/fields/Bootstrap.vue'
import CKEditor5Field from '@/components/fields/CKEditor.vue'
import AgGridField from '@/components/fields/AgGrid.vue'
import MultiselectField from '@/components/fields/MultiSelect.vue'
Vue.component('fieldBootstrap', BootstrapField)
Vue.component('fieldCKEditor', CKEditor5Field)
Vue.component('fieldAgGrid', AgGridField)
Vue.component('fieldMultiselect', MultiselectField)

/* CKEditor5 */
import CKEditor5 from '@ckeditor/ckeditor5-vue'
Vue.use(CKEditor5)

/* Draggable */
import draggable from 'vuedraggable'
/*Vue.use(draggable)*/

import VueExpandableImage from 'vue-expandable-image'
Vue.use(VueExpandableImage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
