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
        <div class="ml-1 w-15">
          <b-form-checkbox-group
            v-model="checkManualInput"
            :options="arrayManualCheckbox"
            name="flavour-2a"
            stacked
            @change="changeCheckboxData"
          ></b-form-checkbox-group>
        </div>
      </div>
      <div v-if="!isText" style="visibility: hidden;">
        <div v-if="isManual">
          <PhotoInput />
        </div>
        <div v-else>
          <p>
            Загрузите zip-архив с фотографиями и размеченным .csv файлом, где
            первый столбец - название фотографии, второй массив классов
            (вариантов разметки для данной фотографии)
          </p>
          <div class="d-flex w-30">
            <b-form-file
              v-model="fileValueNoManual"
              id="fileValueNoManualUpload"
              hidden
            />
            <b-button class="mt-1 ml-2" @click="onDeleteFile">
              <font-awesome-icon :icon="['fas', 'times']" />
            </b-button>
          </div>
        </div>
      </div>
      <div v-if="isText">
        <div v-if="isManual">
          <TextInput />
        </div>
        <div v-else>
          <p>
            Загрузите .csv файл, где первый столбец - необходимый текст, второй
            массив классов (вариантов разметки для данной фотографии)
          </p>
          <div class="d-flex w-30">
            <b-form-file
              v-model="fileValueNoManual"
              id="fileValueNoManualUpload"
              hidden
            />
            <b-button class="mt-1 ml-2" @click="onDeleteFile">
              <font-awesome-icon :icon="['fas', 'times']" />
            </b-button>
          </div>
        </div>
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
    <b-modal
      id="deleteFileOrderModal"
      title="Предупреждение"
      ok-title="Применить"
      cancel-title="Отмена"
      size="lg"
      @ok="deleteClick"
    >
      <div>
        Вы действительно хотите удалить данные?
      </div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button @click="ok()" variant="info">
          Удалить
        </b-button>
        <b-button @click="cancel()">
          Отмена
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import _ from 'lodash'
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
    ...customerMapper.mapActions(['fetchAddOrders'])
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
  private isActive = false
  private fileValue = null
  private fileValueNoManual = null
  private checkManualInput = ['Ввести вручную']
  private isText = true
  private isManual = true
  private ConfinDataValues = Confin.customerInput
  private selectedChangeData = Confin.customerInput[1].value
  private arrayManualCheckbox = StaticData.manualInput

  @Watch('fileValue')
  onFileValueChange() {
    if (
      this.addOrder.indexManual !== -1 &&
      !_.isNil(this.addOrder.indexManual)
    ) {
      this.addOrder.dataManualFile[
        this.addOrder.indexManual
      ].fileValue = this.fileValue
    }
  }

  @Watch('fileValueNoManual')
  onFileValueNoManuaChange() {
    this.addOrder.dataFile = this.fileValueNoManual
  }

  private async addOrderClick() {
    this.addOrder
    const sendObj: any = {
      title: this.addOrder.title,
      description: this.addOrder.description
    }
    const dataTmp = this.isText
      ? this.isManual
        ? this.addOrder.dataManualText
        : this.addOrder.dataFile
      : this.isManual
      ? this.addOrder.dataManualFile
      : this.addOrder.dataFile
    const newData: any = {}
    for (const item of dataTmp) {
      const splitVal = item.valueAnswer.split(',')
      const newObj: any = {}
      for (const spl of splitVal) {
        newObj[`${spl}`] = 0
      }
      newData[`${item.fileValue}`] = newObj
    }
    sendObj['data_type'] = this.selectedChangeData
    sendObj['data'] = newData
    await this.fetchAddOrders(sendObj)
  }

  private onDeleteFile() {
    this.$bvModal.show('deleteFileOrderModal')
  }

  private deleteClick() {
    this.fileValueNoManual = null
  }

  private changeSelectedData() {
    this.isText = this.selectedChangeData === 'photo'
  }

  private changeCheckboxData(params: any) {
    this.isManual = !_.isEmpty(params)
  }

  private openFuc() {
    /**/
  }

  private onChangeField() {
    // console.log('onChangeField')
  }

  private async created() {
    /*this.clearObj = _.clone(this.infoObj)*/
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
