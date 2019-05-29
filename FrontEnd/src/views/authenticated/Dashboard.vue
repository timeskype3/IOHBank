<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider v-model="collapsed" collapsible style="min-height: 100vh;position:fixed;z-index:99999;">
      <div class="logo" />
      <a-avatar :size="64" icon="user" />
      <div v-show="!collapsed" class="username">
        <span>{{ name }}</span>
      </div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <router-link to="/account">
            <a-icon type="user" />
            <span>Account</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"
            ><a-icon type="pie-chart" /><span>Transection</span></span
          >
          <a-menu-item key="2">
            <router-link to="/transfer">
              <a-icon type="team" />
              Transfer
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/payment">
              <a-icon type="bar-chart" />
              Payment
            </router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/top-up">
              <a-icon type="upload" />
              Top-Up
            </router-link>
          </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="5">
          <router-link to="/promotion">
            <a-icon type="shop" />
            <span>Promotion</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <span slot="title"
            ><a-icon type="setting" /><span>Setting</span></span
          >
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
           <router-link to="/report">
          <a-icon type="read" />
          <span>report</span>
           </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding-left:200px;">
      <a-layout-header style="background: #205072; text-align: right;position:fixed;z-index:999999;width: calc(100vw - 200px);">
        <span style="margin-right: 20px;color:#FFD700">
          <a-switch :default-checked="false" /> Show Balance</span
        >
        <span
          style="margin-right: 10px;
                  color:#fff"
        >
          {{ name }} 's Account
        </span>
        <a-button type="danger" @click="logout()">
          logout
        </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        InOurHeartBank ©2019
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    name() {
      return jwt.decode(localStorage.getItem("token")).name;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$message.info("Logout Complete");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
#components-layout-demo-side .username {
  text-align: center;
  color: #15bce6;
  padding: 20px;
}
</style>
