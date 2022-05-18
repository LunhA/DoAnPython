<template>
  <div class="main-container">
    <div v-if="product" class="item-detail">
      <div class="item-detail-img">
        <img :src="product.img" alt="product img" />
      </div>
      <div class="item-detail-info">
        <h2 class="title">{{ product.name }}</h2>
        <h6 class="brand-name">
          THƯƠNG HIỆU <a href="#">{{ product.brand }}</a>
        </h6>
        <span class="item-price">{{ formatPrice(product.price) }}</span>
        <div class="guarantee">
          <div class="guarantee-img">
            <img src="assets/images/icons/icon-shield.svg" alt="" />
          </div>
          <div class="guarantee-time">Bảo hành 12 tháng.</div>
        </div>
        <button class="buy-btn" @click="onAddToCart()">
          THÊM VÀO GIỎ HÀNG
        </button>
        <br />
        <div class="more-detail" style="text-align: justify">
          <ul>
            <li :key="item.id" v-for="item in product.descriptions">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductById } from '@/utils/product-service';
import { cartService } from '@/utils/cart-service';

export default {
  name: 'ChiTietSanPham',
  components: {},
  data() {
    return {
      product: null,
    };
  },
  watch: {
    $route() {
      this.getProductData();
    },
  },
  mounted() {
    this.getProductData();
  },
  methods: {
    async getProductData() {
      const productId = this.$route.params.id;
      const product = await getProductById(productId);

      // Backend phân biệt mỗi item khi xuống hàng bằng dấu phẩy
      const symbolToBeSplitted = ',';
      product.descriptions = product.descriptions.split(symbolToBeSplitted);
      this.product = product;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    onAddToCart() {
      if (this.product) {
        cartService.addCartItem(this.product);
        alert('Đã thêm sản phẩm vào giỏ hàng thành công');
      }
    },
  },
};
</script>
