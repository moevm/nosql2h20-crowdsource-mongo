  <template>
  <div class="ml-5">
    <h5>Фильтры</h5>
    <div class="d-flex mb-4 filterDivCatalog">
      <div class="ml-1 w-15">
        <label for="filterTypeTask">Тип задания</label>
        <b-form-checkbox-group
          id="filterTypeTask"
          v-model="checkFiltersTypeTask"
          :options="filtersTypeTask"
          name="flavour-2a"
          stacked
        ></b-form-checkbox-group>
      </div>
      <div class="ml-1 w-15">
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
    <div class="mt-4 catalogList">
      <div v-for="(product, index) of productList"
            :key="index">
        <OrderCard class="mt-1" :product="product" />
      </div>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Config from '@/config/config'
import OrderCard from '@/components/help/OrderCard.vue'
import {FormOptions, FormSchema} from 'vue-form-generator'
import MultiSelect from 'vue-multiselect'
import { clientMapper } from '@/store/modules/client'
import ruMultiselect from '@/i18n/ru_multiselect'

const Mappers = Vue.extend({
  computed: {
    ...clientMapper.mapState(['clientCatalog', 'allProduct', 'filterCatalog'])
  },
  methods: {
    ...clientMapper.mapActions(['fetchCatalogClient', 'fetchProductClient']),
    ...clientMapper.mapMutations(['setFilterCatalog'])
  }
})

@Component({
  components: {
    MultiSelect,
    OrderCard
  }
})
export default class CatalogProduct extends Mappers {
  private filtersTypeTask = Config.typeTask
  private filtersCustomer = Config.customers
  private checkFiltersTypeTask = []
  private checkFiltersCustomer = []
  private productList = Config.orderList
  private filterProduct = []
  private selectFilterCatalog: any = 'Выберете значение'
  private filterPrice = 0
  private filtersObj = {
    filterPrice: 0
  }
  private ruMultiselect = ruMultiselect

  @Watch('clientCatalog')
  onClientCatalog() {
    console.log('onClientCatalog', this.clientCatalog)
    this.filterProduct = this.clientCatalog
  }

  @Watch('allProduct')
  onAllProduct() {
    console.log('allProduct', this.allProduct)
    this.productList = this.allProduct
  }

  @Watch('filterCatalog')
  onFilterCatalog() {
    console.log('onFilterCatalog', this.filterCatalog)
    this.changeCatalog()
  }

  private async changeCatalog() {
    console.log('changeCatalog  ', this.selectFilterCatalog, this.filterCatalog)
    this.setFilterCatalog(this.selectFilterCatalog)
    await this.fetchProductClient(this.filterCatalog.id)
    this.productList = this.allProduct
  }

  private addCategotyClick() {
    this.$bvModal.show('addCategoryModal')
    console.log('addCategotyClick')
  }

  private addProductOrderClick() {
    this.$bvModal.show('addProductsModal')
    console.log('addProductOrderClick')
  }

  private customLabelProdiucts({ name }: any) {
    if (name) {
      return name
    } else {
      return `Выберите значение`
    }
  }

  async created() {
    console.log('Create catalog', this.productList)
    /*console.log('Create catalog', this.productList)
    //await this.fetchCatalogClient()
    console.log('created after', this.clientCatalog)
    //await this.fetchProductClient(this.clientCatalog[0].id)
    this.setFilterCatalog(this.clientCatalog[0])
    this.selectFilterCatalog = this.clientCatalog[0]
    this.productList = this.allProduct
    this.filterProduct = this.clientCatalog
    console.log('Create catalog ends', this.clientCatalog, this.allProduct)*/
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
.catalogList{
  height: 60vh;
  width: 85%;
  overflow: scroll;
  overflow-x:hidden;
}
</style>
