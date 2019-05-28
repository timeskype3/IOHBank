<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '400px' }">
      Transfer
      <a-form-item v-bind="formItemLayout" label="Your Account">
            <a-select 
            v-decorator="[
            'Account',
            {
              rules: [
                {
                  required: true,
                  message: 'Select Your Account'
                }
              ]
            }
          ]"
          style="width:280px"
          placeholder="Select Your Account">
              <a-select-option value="1"> Account1 </a-select-option>
              <a-select-option value="2"> Account2 </a-select-option>
              <a-select-option value="3"> Account3 </a-select-option>
            </a-select>
          </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Bank">
            <a-select 
            v-decorator="[
            'Bank',
            {
              rules: [
                {
                  required: true,
                  message: 'Select Bank'
                }
              ]
            }
          ]"
          style="width:280px"
          placeholder="Select Bank">
              <a-select-option value="IOH"> InOurHeart </a-select-option>
              <a-select-option value="BBL"> Bangkok </a-select-option>
              <a-select-option value="KTB"> Krung Thai </a-select-option>
              <a-select-option value="TMB"> TMB </a-select-option>
              <a-select-option value="SCB"> SiamCommercial </a-select-option>
            </a-select>
          </a-form-item>
      <a-form-item v-bind="formItemLayout" label="To. ">
        <a-input placeholder="Enter Account Number"/>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Amount ">
        <a-input placeholder="Enter Your Amount"/>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="Note ">
        <a-input placeholder="Enter Your Note"/>
      </a-form-item>
      <a-button type="primary" html-type="submit" 
      @click="Next()">
        Next
      </a-button>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import MyAccount from "@/views/authenticated/Transections/Transfer/MyAccount.vue";
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
    },
    Next() {
      this.$router.push("/checktransfer");
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
