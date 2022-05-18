<template>
  <div class="main-container">
    <div v-if="payment" class="bill-review">
      <h2 title>THÔNG TIN ĐƠN HÀNG</h2>
      <div class="bill-body">
        <span class="customer-title">Tên khách hàng:</span>
        <span class="bill-info">{{ payment.tenKH }}</span>
        <span class="customer-title">Số điện thoại:</span>
        <span class="bill-info">{{ payment.sdtKH }}</span>
        <span class="customer-title">Địa chỉ:</span>
        <span class="bill-info">{{ payment.diachiKH }}</span>
        <span class="customer-title">Ghi chú:</span>
        <span class="bill-info">{{ payment.ghichuKH }}</span>
        <div class="line2"></div>
        <ul class="cart-table">
          <li>
            <div style="display: flex; justify-content: left">STT</div>
            <div style="margin-left: 10%; width: 20%">Món Hàng</div>
            <div style="margin-left: 26%">Đơn Giá</div>
          </li>
        </ul>
        <ul class="cart-table">
          <li :key="index" v-for="(item, index) in payment.items">
            <div style="display: flex; justify-content: left">
              {{ index + 1 }}
            </div>
            <div style="margin-left: 6.5%; width: 25%">
              <img :src="item.img" style="height: 100px" /> {{ item.name }}
            </div>
            <div style="margin-left: 26%">{{ formatPrice(item.price) }} đ</div>
          </li>
        </ul>
        <h3 style="margin-top: 20px">TỔNG CỘNG: {{ totalPrice }} đ</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { cartService } from '@/utils/cart-service';
export default {
  name: 'DatHangThanhCong',
  component: {},
  data() {
    return {
      payment: {
         items: []
      }
    }
  },
  mounted() {
    const payment = cartService.getPaymentInfo();
    if (payment) {
      this.payment = payment;
    }
  },
  computed: {
    totalPrice() {
      return this.formatPrice(
        this.payment.items.reduce(
          (previous, currentItem) => (previous += currentItem.price),
          0
        )
      );
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
};
</script>

<style></style>
