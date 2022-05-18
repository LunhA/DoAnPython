import { createRouter, createWebHashHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import SanPham from '@/views/SanPham.vue';
import ChiTietSanPham from '@/views/ChiTietSanPham.vue';
import GioHang from '@/views/GioHang.vue';
import DangNhap from '@/views/DangNhap.vue';
import DatHangThanhCong from '@/views/DatHangThanhCong.vue';
import LienHe from '@/views/LienHe.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing,
  },
  {
    path: '/sanpham',
    name: 'SanPham',
    component: SanPham,
  },
  {
    path: '/sanpham/:id',
    name: 'ChiTietSanPham',
    component: ChiTietSanPham,
  },
  {
    path: '/giohang',
    name: 'GioHang',
    component: GioHang,
  },
  {
    path: '/dangnhap',
    name: 'DangNhap',
    component: DangNhap,
  },
  {
    path: '/dathangthanhcong',
    name: 'DatHangThanhCong',
    component: DatHangThanhCong,
  },
  {
    path: '/lienhe',
    name: 'LienHe',
    component: LienHe,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
