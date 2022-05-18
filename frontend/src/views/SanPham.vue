<template>
  <div class="main-container">
    <div class="main-promo">
      <img
        src="assets/images/banners/productBanner2.jpg"
        style="margin-top: 100px; width: 100%; object-fit: cover"
      />
    </div>
    <div class="main-content">
      <div
        class="main-tag"
        :class="{ 'main-tag-active': selectedType === productType.FULL_SIZED }"
        @click="onTypeChange(productType.FULL_SIZED)"
      >
        FULL SIZED
      </div>
      <div
        class="main-tag"
        :class="{ 'main-tag-active': selectedType === productType.IN_EAR }"
        @click="onTypeChange(productType.IN_EAR)"
      >
        IN EAR
      </div>
      <div
        class="main-tag"
        :class="{ 'main-tag-active': selectedType === productType.EAR_BUD }"
        @click="onTypeChange(productType.EAR_BUD)"
      >
        EARBUD
      </div>
      <div
        class="main-tag"
        :class="{
          'main-tag-active': selectedType === productType.TRUE_WIRELESS,
        }"
        @click="onTypeChange(productType.TRUE_WIRELESS)"
      >
        TRUE WIRELESS
      </div>
    </div>
    <div class="main-content">
      <div class="new-product">
        <div class="search-bar">
          <input
            id="search-input"
            type="search"
            name="s"
            placeholder="Gõ để tìm kiếm"
            maxlength="40"
            style="
              border: 1px solid rgb(116, 116, 116);
              border-radius: 38px;
              border-image: initial;
              background: none;
              width: 500px;
              height: 60px;
              padding: 30px;
            "
            v-model="searchKey"
          />
          <div class="search-icon">
            <img
              class="search-icon-img"
              src="assets/images/icons/search-icon.png"
            />
          </div>
        </div>

        <div class="sort-container">
          <div class="sort-option">SẮP XẾP THEO:</div>
          <div class="sort-form">
            <select
              name="product-status"
              id="product-status"
              @change="onSortChange($event)"
            >
              <option :value="productSort.NEWEST">Mới nhất</option>
              <option :value="productSort.OLDEST">Cũ Nhất</option>
              <option :value="productSort.PRICE_HIGH">Từ cao tới thấp</option>
              <option :value="productSort.PRICE_LOW">Từ thấp tới cao</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="new-product">
        <div class="left-menu">
          <div class="brand-filter">
            <div class="brand-filter-title">THƯƠNG HIỆU</div>
            <div class="brand-container">
              <label class="container">
                <input
                  type="checkbox"
                  id="Apple"
                  :value="productBrand.APPLE"
                  v-model="checkedBrands"
                />
                <span class="checkmark"></span> APPLE
              </label>
              <label class="container">
                <input
                  type="checkbox"
                  id=""
                  :value="productBrand.FOCAL"
                  v-model="checkedBrands"
                  :defaultValue="checked"
                />
                <span class="checkmark"></span> Focal
              </label>
              <label class="container">
                <input
                  type="checkbox"
                  id="HIFIMAN"
                  :value="productBrand.HIFIMAN"
                  v-model="checkedBrands"
                />
                <span class="checkmark"></span> HiFiMan
              </label>
              <label class="container">
                <input
                  type="checkbox"
                  id="MOONDROP"
                  :value="productBrand.MOONDROP"
                  v-model="checkedBrands"
                />
                <span class="checkmark"></span> MOONDROP
              </label>
              <label class="container">
                <input
                  type="checkbox"
                  id="SONY"
                  :value="productBrand.SONY"
                  v-model="checkedBrands"
                />
                <span class="checkmark"></span> SONY
              </label>
            </div>
          </div>
          <div class="brand-filter price-filter">
            <div class="brand-filter-title">KHOẢNG GIÁ</div>
            <div class="price-container">
              Chọn khoảng giá mong muốn.
              <input
                type="number"
                name=""
                id="price-input"
                v-model="minPrice"
              />
              <span>-</span>
              <input
                type="number"
                name=""
                id="price-input"
                v-model="maxPrice"
              />
            </div>
          </div>
        </div>
        <div class="product-list">
          <div class="item-container">
            <div
              :key="product.id"
              v-for="product in products"
              class="new-items"
            >
              <div @click="onProductClick(product)">
                <div class="new-items-img">
                  <img
                    :src="product.img"
                    alt="product img"
                    style="height: 210px; width: 210px"
                  />
                </div>
                <div class="new-items-data">
                  <a class="new-items-data--title">
                    <p>{{ product.name }}</p>
                  </a>
                  <div class="newprice">{{ formatPrice(product.price) }} đ</div>
                </div>
              </div>
            </div>
          </div>
          <ul class="pagination">
            <li
              :class="{ disabled: !canPreviousPage }"
              @click="onPreviousPage()"
            >
              «
            </li>
            <li
              :key="page"
              v-for="page in pages"
              @click="onPageChange(page)"
              :class="{ active: page === currentPage }"
            >
              {{ page }}
            </li>
            <li :class="{ disabled: !canNextPage }" @click="onNextPage()">»</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PRODUCT_BRANDS, PRODUCT_TYPE } from '@/consts/product';
import { SORT_BY } from '@/consts/commons';
import {
  getPaginatedProducts,
} from '@/utils/product-service.js';

const pageSize = 8;

export default {
  name: 'SanPham',
  components: {},
  data() {
    return {
      products: [],
      currentPage: 1,
      total: 0,
      sortBy: SORT_BY.NEWEST,
      selectedType: '',
      checkedBrands: Object.values(PRODUCT_BRANDS), // biến cái const BRANDS thành mảng ở đây luôn
      searchKey: '',
      minPrice: '0',
      maxPrice: '100000000',
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    productType() {
      return PRODUCT_TYPE;
    },
    productBrand() {
      return PRODUCT_BRANDS;
    },
    productSort() {
      return SORT_BY;
    },
    pageCount() {
      return Math.ceil(this.total / pageSize);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.pageCount; i++) {
        pages.push(i);
      }

      return pages;
    },
    canNextPage() {
      return this.currentPage < this.pageCount;
    },
    canPreviousPage() {
      return this.currentPage > 1;
    },
  },
  watch: {
    minPrice() {
      this.onPriceChange();
    },
    maxPrice() {
      this.onPriceChange();
    },
    searchKey() {
      this.onSearchKeyChange();
    },
    checkedBrands() {
      this.onBrandSelectionChange();
    },
  },
  methods: {
    async fetchData() {
      const { total, data } = await getPaginatedProducts({
        pageIndex: this.currentPage - 1,
        pageSize: pageSize,
        filterBy: {
          type: this.selectedType,
          checkedBrands: this.checkedBrands,
        },
        sortBy: this.sortBy,
        searchKey: this.searchKey,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      });
      this.total = total;
      this.products = data;
    },
    onSearchKeyChange() {
      this.currentPage = 1;
      this.fetchData();
    },
    onPriceChange() {
      this.currentPage = 1;
      this.fetchData();
    },
    onSortChange(e) {
      const value = e.target.value;
      this.sortBy = value;
      this.currentPage = 1;
      this.fetchData();
    },
    onBrandSelectionChange() {
      this.currentPage = 1;
      this.fetchData();
    },
    onTypeChange(type) {
      if (this.selectedType === type) {
        this.selectedType = '';
      } else {
        this.selectedType = type;
      }

      this.currentPage = 1;
      this.fetchData();
    },
    onProductClick(product) {
      this.$router.push(`/sanpham/${product.id}`);
    },
    onNextPage() {
      if (this.canNextPage) {
        this.currentPage += 1;
        this.fetchData();
      }
    },
    onPreviousPage() {
      if (this.canPreviousPage) {
        this.currentPage -= 1;
        this.fetchData();
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
};
</script>
