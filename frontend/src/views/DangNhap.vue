<template>
  <div class="main-container">
    <div class="main-content">
      <div v-if="isLoggedIn" class="member-content">
        <div class="member-form login">
          <span class="member-form-title">XIN CHÀO QUÝ KHÁCH</span>
          <h2>{{ user.username }}</h2>
          <div class="login-func">
            <div class="member-btn" @click="onLogout()">ĐĂNG XUẤT</div>
            <div class="member-btn" @click="onRebill()">XEM ĐƠN ĐÃ ĐẶT</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoggedIn" class="main-content">
      <div class="member-content">
        <div class="member-form login">
          <span class="member-form-title">ĐĂNG NHẬP</span>
          <form action="">
            <label for="username" class="form-description"
              >Tên đăng nhập *</label
            >
            <br />
            <input
              type="text"
              class="user-input"
              id="username-id"
              required
              v-model="username"
            />
            <br />
            <label for="password" class="form-description">Mật khẩu *</label>
            <br />
            <input
              type="password"
              class="user-input"
              name="password"
              id="username-pws"
              required
              v-model="password"
            />
            <br />
          </form>
          <div class="login-func">
            <a href="" style="text-decoration: none; color: black"
              >Quên mật khẩu</a
            >
            <div class="member-btn" @click="onLogin()">ĐĂNG NHẬP</div>
          </div>
        </div>
        <div class="member-form register">
          <span class="member-form-title">ĐĂNG KÝ</span>
          <form action="">
            <label for="username" class="form-description"
              >Tên đăng nhập *</label
            >
            <br />
            <input
              type="text"
              class="user-input"
              id="username-id"
              required
              v-model="username"
            />
            <br />
            <label for="password" class="form-description">Mật khẩu *</label>
            <br />
            <input
              type="password"
              class="user-input"
              name="password"
              id="username-pws"
              required
              v-model="password"
            />
            <br />
          </form>
          <div class="register-func">
            <div class="member-btn" @click="onRegister()">ĐĂNG KÝ</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/utils/auth-service';

export default {
  name: 'DangNhap',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      user: {},
    };
  },
  mounted() {
    this.user = authService.getSession();
  },
  computed: {
    isLoggedIn() {
      return !!authService.getSession();
    },
  },
  methods: {
    async onLogin() {
      if (!this.username || !this.password) {
        alert('Tên đăng nhập hoặc mật khẩu không được bỏ trống');
        return;
      }

      const result = await authService.login({
        username: this.username,
        password: this.password,
      });

      if (result.ok) {
        alert('Đăng nhập thành công, bấm OK để chuyển đến trang chủ');
        this.$router.push('/');
      } else {
        alert(
          'Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản hoặc mật khẩu'
        );
      }
    },
    onLogout() {
      authService.logout();
      this.$router.push('/');
    },
    onRebill() {
      this.$router.push('/dathangthanhcong');
    },
    async onRegister() {
      if (!this.username || !this.password) {
        alert('Tên đăng nhập hoặc mật khẩu không được bỏ trống');
        return;
      }

      const result = await authService.register({
        username: this.username,
        password: this.password,
      });

      if (result.ok) {
        alert(
          'Đã đăng ký thành công tài khoản: ' +
            result.user.username +
            ' vui lòng đăng nhập để mua hàng'
        );
      } else {
        alert('Đã có lỗi xảy ra, đăng ký thất bại');
      }
    },
  },
};
</script>
