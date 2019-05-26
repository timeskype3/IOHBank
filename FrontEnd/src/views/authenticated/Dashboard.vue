<template>
   <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      collapsible
      v-model="collapsed"
    >
      <div class="logo"/>
      <a-avatar :size="64" icon="user" />
      <div class="username" v-show="!collapsed">
         <span>{{ name }}</span>
        </div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" >
        <a-menu-item key="1" >
          <router-link to="">
          <a-icon type="user" />
             <span>Account</span>
          </router-link>
        </a-menu-item>
          <a-sub-menu key="sub1" >
          <span slot="title"><a-icon type="pie-chart" /><span>Transection</span></span>
          <a-menu-item key="2">
             <router-link to="/transfer">
             <a-icon type="team"/>
             Transfer
              </router-link>
             </a-menu-item>
          <a-menu-item key="3">
             <router-link to="/payment">
            <a-icon type="bar-chart"/>
            Payment
             </router-link>
            </a-menu-item>
          <a-menu-item key="4">
             <router-link to="/top-up">
            <a-icon type="upload"/>
            Top-Up
             </router-link>
            </a-menu-item>
        </a-sub-menu>

        <a-menu-item key="5">
          <a-icon type="shop" />
          <span>Promotion</span>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="setting" /><span>Setting</span></span>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #205072; text-align: right ">
        <span style="margin-right: 20px;color:#FFD700" > <a-switch :defaultChecked="false"/> Show Balance</span>
         <h style="margin-right: 10px;
                  color:#fff">
           {{ name }} 's Account
          </h>
        <a-button
         @click="logout()"
         type="danger">
          logout
        </a-button>
        </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view/>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        InOurHeartBank ©2019
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
  data() {
    return {
      collapsed: false,
    }
  },
  methods:{
      logout() {
                localStorage.removeItem("token")
                this.$message.info('Logout Complete')
                this.$router.push('/login')
        }
    },
    computed: {
      name() {
        return jwt.decode(localStorage.getItem('token')).name
      }
    }
}


</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;

}
#components-layout-demo-side .username{
  text-align: center;
   color: #15bce6;
   padding: 20px;
   

}
 
</style>