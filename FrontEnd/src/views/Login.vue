<template>
  <div class="login">
    <a-layout id="components-layout">
      <a-layout-header>
          <img alt="Vue logo" src="../assets/logo.png" />
          </a-layout-header>
      <a-layout-content>
         <FormLogin/>
          </a-layout-content>
      <a-layout-footer>
          Footer
          </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import FormLogin from "@/components/FormLogin.vue";

export default {
  name: "login",
  components: {
    FormLogin
  }
};
</script>

<style>
#components-layout {
  text-align: center;
}
#components-layout .ant-layout-header{
    min-height: 220px;
}
#components-layout .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout .ant-layout-footer {
  line-height: 1.5;
}
#components-layout .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 20px;
}
#components-layout .ant-layout-content {
  background: rgb(4, 61, 102);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
  min-width: 300px;
}
#components-layout > .ant-layout {
  margin-bottom: 40px;
}
#components-layout > .ant-layout:last-child {
  margin: 0;
}

</style>

