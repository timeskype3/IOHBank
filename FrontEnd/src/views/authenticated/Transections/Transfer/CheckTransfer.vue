<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '400px' }">
      Check Your Transection <br>
      <a-button type="primary" html-type="submit" 
      @click="register()">
        Confirm
      </a-button>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    formItemLayout: {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 6 }
      }
    }
  }),
  methods: {
    test() {
      this.loading = true;
      api
        .get("/auth")
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.steps-content {
  margin-top: 20px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
  margin-right: 10px;
}

.steps-action {
  margin-top: 24px;
}
</style>
