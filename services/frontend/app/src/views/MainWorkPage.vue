<template>
  <div class="ml-5">
    <div v-if="isWork">
      <h5>Фильтры</h5>
      <div class="d-flex mb-4 filterDivCatalog">
        <div v-if="isWork" class="ml-1 w-15">
          <label for="filterTypeTask">Тип задания</label>
          <b-form-checkbox-group
            id="filterTypeTask"
            v-model="checkFiltersTypeTask"
            :options="filtersTypeTask"
            name="flavour-2a"
            stacked
          ></b-form-checkbox-group>
        </div>
        <div v-if="isWork" class="ml-1 w-15">
          <label for="filterCustomer">Заказчики</label>
          <b-form-checkbox-group
            id="filterCustomer"
            v-model="checkFiltersCustomer"
            :options="filtersCustomer"
            name="flavour-2a"
            stacked
          ></b-form-checkbox-group>
        </div>
      </div>
    </div>
    <div v-if="!isWork" class="addOrderClass">
      <b-button class="mr-1" @click="addOrderClick()" variant="info">
        Добавить заказ
      </b-button>
    </div>
    <div class="mt-4 catalogList">
      <div v-for="(product, index) of orderList" :key="index">
        <OrderCard class="mt-1" :product="product" />
      </div>
    </div>
    <br />
    <AddOrderModal />
    <EditOrderModal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Config from '@/config/config'
import OrderCard from '@/components/help/OrderCard.vue'
import { clientMapper } from '@/store/modules/client'
import AddOrderModal from '@/components/Modal/Customer/AddOrderModal.vue'
import { userMapper } from '@/store/modules/user'
import { customerMapper } from '@/store/modules/customer'
import EditOrderModal from '@/components/Modal/Customer/EditOrderModal.vue'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState([]),
    ...userMapper.mapState(['isAuthenticated', 'isWork']),
    ...customerMapper.mapState(['orderList'])
  },
  methods: {
    ...customerMapper.mapActions(['fetchAllOrders'])
  }
})

@Component({
  components: {
    OrderCard,
    AddOrderModal,
    EditOrderModal
  }
})
export default class MainWorkPage extends Mappers {
  private filtersTypeTask = Config.typeTask
  private filtersCustomer = Config.customers
  private checkFiltersTypeTask = []
  private checkFiltersCustomer = []

  private addOrderClick() {
    this.$bvModal.show('addOrderModal')
  }

  async created() {
    await this.fetchAllOrders()
  }
}
</script>

<style lang="scss" scoped>
.swiper-size {
  height: 30%;
  display: flex;
}
.textMainView {
  font-size: 18px;
}
.catalogList {
  height: 60vh;
  overflow: scroll;
  overflow-x: hidden;
}
.addOrderClass {
  text-align: right;
}
</style>
