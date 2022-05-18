<template>
  <div class="header-container">
    <div class="header-content">
      <div class="left">
        <router-link to="/">Ikus Audio</router-link>
      </div>
      <div class="middle">
        <div class="header-menu">
          <router-link class="header-menu-title" to="/sanpham"
            >SẢN PHẨM</router-link
          >
        </div>

        <div class="header-menu">
          <router-link class="header-menu-title" to="/lienhe"
            >LIÊN HỆ</router-link>
        </div>
      </div>
      <div class="right"> 
        <div class="navbar-btn login-icon">
          <router-link
            custom
            v-slot="{ navigate }"
            class="navbar-link"
            to="/dangnhap"
            ><img
              class="navbar-icon"
              src="assets/images/icons/account.png"
              @click="navigate"
          /></router-link>
        </div>
        <div class="navbar-btn cart">
          <router-link
            custom
            v-slot="{ navigate }"
            class="navbar-link"
            to="/giohang"
            ><img
              class="navbar-icon"
              @click="navigate"
              src="assets/images/icons/shopping-cart.png"
          /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return { count: 10 };
  },
};
</script>
