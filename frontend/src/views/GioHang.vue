<template>
  <div class="main-container">
    <div class="cart-container">
      <div class="payment-content">
        <span class="payment-title">Giỏ Hàng</span><br />
        <div class="line"></div>
        <br />
        <span class="customer-info-title">Thông tin khách hàng</span>
        <div class="main-payment-info">
          <form action="" id="customer-info">
            <label for="">Họ tên *</label><br />
            <input
              type="text"
              class="user-input"
              v-model="tenKH"
              required
            /><br />
            <label for="">Địa chỉ *</label><br />
            <input
              type="text"
              class="user-input"
              v-model="diachiKH"
              required
            /><br />
            <label for="">Số điện thoại *</label><br />
            <input
              type="text"
              class="user-input"
              name=""
              v-model="sdtKH"
              required
            /><br />
            <label for="">Ghi chú</label><br />
            <input type="text" class="user-input" v-model="ghichuKH" /><br />
          </form>
        </div>
        <div class="main-payment-method main-payment-info">
          <span class="customer-info-title">Phuong thuc thanh toan</span>
          <form action="" id="payment-method">
            <input
              type="radio"
              class="payment-checkbox"
              name="payment"
              id=""
            />COD
            <img
              style="height: 30px"
              src="assets/images/icons/COD.png"
              alt=""
            />
            <br />
          </form>
        </div>
      </div>
      <div class="cart-content">
        <div class="total">TỔNG TIỀN: {{ totalPrice }}</div>
        <div class="complete-payment" @click="onPayment()">THANH TOÁN</div>
        <div class="line2"></div>
        <br />
        <div class="cart-list">
          <ul>
            <li :key="i" v-for="(item, i) in cartItems">
              <div class="cart-list-item">
                <span>{{ i + 1 }}.</span>
                <img :src="item.img" />
                {{ item.name }} | {{ formatPrice(item.price) }}
                <div class="delete-item" @click="onRemoveItem(item)">
                  <img src="assets/images/icons/bin.png" alt="" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartService } from '@/utils/cart-service';
import { authService } from '@/utils/auth-service';

export default {
  name: 'GioHang',
  components: {},
  data() {
    return {
      cartItems: [],
      tenKH: '',
      diachiKH: '',
      sdtKH: '',
      ghichuKH: '',
      user: null,
    };
  },
  mounted() {
    this.getCartData();
  },
  watch: {
    $route() {
      this.getCartData();
    },
  },
  computed: {
    totalPrice() {
      return this.formatPrice(
        this.cartItems.reduce(
          (previous, currentItem) => (previous += currentItem.price),
          0
        )
      );
    },
  },
  methods: {
    getCartData() {
      this.user = authService.getSession();
      this.cartItems = cartService.getCartItems();
    },
    onPayment() {
      if (!this.user) {
        alert('Vui lòng đăng nhập trước khi mua hàng!');
        this.$router.push('/dangnhap');
        return;
      }

      const payment = {
        tenKH: this.tenKH,
        diachiKH: this.diachiKH,
        sdtKH: this.sdtKH,
        ghichuKH: this.ghichuKH,
        items: this.cartItems,
      };

      cartService.addPaymentInfo(payment);
      alert('Đặt hàng thành công, ấn OK để về trang chủ');
      this.$router.push('/');
      cartService.clearCart();
    },
    onRemoveItem(item) {
      cartService.removeCartItem(item);
      this.cartItems = cartService.getCartItems();
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
  },
};
</script>
