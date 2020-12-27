<template>
  <div>
    <b-modal
      id="addOrderModal"
      title="Добавление заказа"
      size="xl"
      @ok="addOrderClick"
      @show="openFuc"
    >
      <div class="w-60 d-flex">
        <label for="nameOrder">Название заказа</label>
        <b-form-input
          id="nameOrder"
          @input="onChangeField"
          v-model="addOrder.title"
          :disabled="isActive"
          placeholder="Название заказа"
          trim
        />
      </div>
      <label for="desc-order-textarea">Описание</label>
      <b-form-textarea
        v-model="addOrder.description"
        no-resize
        id="desc-order-textarea"
        placeholder="Введите описание заказа"
      />
      <div class="mt-1 text-o-ellipsis">Данные для заказа</div>
      <div class="d-flex">
        <div>
          <b-form-radio-group
            id="radio-group-2"
            v-model="selectedChangeData"
            @change="changeSelectedData"
            name="radio-sub-component"
          >
            <b-form-radio
              v-for="(obj, index) of ConfinDataValues"
              :key="index"
              :value="`${obj.value}`"
              >{{ obj.title }}</b-form-radio
            >
          </b-form-radio-group>
        </div>
      </div>
      <div v-if="!isText">
        <PhotoInput />
      </div>
      <div v-if="isText">
        <TextInput />
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" :disabled="allFill" variant="info">
          Создать
        </b-button>
        <b-button @click="cancel()">
          Закрыть
        </b-button>
      </template>
    </b-modal>
    <b-form-file
      v-model="fileValue"
      id="fileUpload"
      style="visibility: hidden;"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AwesomeMask from 'awesome-mask'
import StaticData from '@/config/config'
import Confin from '@/config/configs'
import PhotoInput from '@/components/help/PhotoInput.vue'
import TextInput from '@/components/help/TextInput.vue'
import { customerMapper } from '@/store/modules/customer'

const Mappers = Vue.extend({
  computed: {
    ...customerMapper.mapState(['addOrder'])
  },
  methods: {
    ...customerMapper.mapMutations(['setAddOrder']),
    ...customerMapper.mapActions(['fetchAddOrders', 'fetchAddOrdersPhoto'])
  }
})

@Component({
  directives: {
    mask: AwesomeMask
  },
  components: {
    PhotoInput,
    TextInput
  }
})
export default class AddOrderModal extends Mappers {
  private allFill = false
  private dis = true
  private isActive = false
  private fileValue: any = null
  private isText = true
  private ConfinDataValues = Confin.customerInput
  private selectedChangeData = Confin.customerInput[1].value

  @Watch('fileValue')
  onFileValueChange() {
    if (
      this.addOrder.indexManual !== -1 &&
      this.addOrder.indexManual !== null &&
      this.addOrder.indexManual !== undefined
    ) {
      this.addOrder.dataManualFile[
        this.addOrder.indexManual
      ].fileValue = this.fileValue
    }
  }

  private async addOrderClick() {
    this.addOrder
    const sendObj: any = {
      title: this.addOrder.title,
      description: this.addOrder.description
    }
    const dataTmp = this.isText
      ? this.addOrder.dataManualText
      : this.addOrder.dataManualFile
    const splitVal = this.addOrder.answer.split(',')
    const newData: any = {}
    for (const item of dataTmp) {
      const newObj: any = {}
      for (const spl of splitVal) {
        newObj[`${spl}`] = 0
      }
      newData[`${this.isText ? item.fileValue : `${item.fileValue.name.replace('.', '$')}`}`] = newObj
    }
    sendObj['data_type'] = this.selectedChangeData
    sendObj['data'] = newData
//    console.log('phote',this.isText, {sendObj: sendObj, dataTmp: dataTmp})
    this.isText ?  await this.fetchAddOrders(sendObj) : this.fetchAddOrdersPhoto({sendObj: sendObj, dataTmp: dataTmp})
  }

  private onDeleteFile() {
    this.$bvModal.show('deleteFileOrderModal')
  }

  private changeSelectedData() {
    this.isText = this.selectedChangeData === 'photo'
  }

  private openFuc() {
    /**/
    this.setAddOrder({
      title: '',
      description: '',
      dataManualFile: [],
      dataManualText: [],
      indexManual: -1
    })
  }

  private onChangeField() {
    // console.log('onChangeField')
  }

  private async created() {
    /**/
  }
}
</script>

<style lang="scss">
.divFilter {
  width: 30%;
  padding: 5px;
}
.mainDivFilter {
  display: flex;
}
label {
  margin-bottom: 0;
  margin-top: 5px;
}
</style>
