<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div
      :style="{
        padding: '24px',
        background: '#fff',
        minHeight: '360px'
      }"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="From account ID"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          style="margin-top:20px"
          ><a-select
            v-model="accountID"
            v-decorator="[
              'select',
              {
                rules: [
                  { required: true, message: 'Please select your account' }
                ]
              }
            ]"
            placeholder="Select an account"
          >
            <a-select-option
              v-for="(item, i) in read"
              :key="i"
              :value="item.AccountID"
            >
              <div style="display:flex !important;">
                <div style="margin-right:10px;">
                  {{ item.AccountID }}
                </div>
                <div v-if="item.AccountType === 1">
                  ( Saving )
                </div>
                <div v-if="item.AccountType === 2">
                  ( Fixed )
                </div>
                <div v-if="item.AccountType === 3">
                  ( Current )
                </div>
              </div>
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="To Bank"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          :v-model="bank"
        >
          <a-select
            v-decorator="[
              'tobank',
              { initialValue: 'IOHBank' },
              {
                rules: [{ message: 'Please select your gender!' }]
              }
            ]"
            placeholder="Select bank"
            @change="handleSelectChange"
          >
            <a-select-option value="IOHBank">
              IOHBank
            </a-select-option>
            <a-select-option value="SCB">
              SCB
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="To account ID"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model="amount"
            v-decorator="[
              'toaccount',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>

        <a-form-item
          label="Amount"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model="amount"
            v-decorator="[
              'Amount',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>

        <a-form-item
          label="Note"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="note" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
          {{ accountID }}
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      bank: "IOHBANK",
      profile: {},
      read: {},
      accountID: {}
    };
  },
  mounted() {
    api()
      .get("/profile")
      .then(({ data }) => {
        this.profile = data;
        api()
          .get("/account/read/" + this.profile.ClientID)
          .then(({ data }) => {
            console.log(data);
            this.read = data;
          });
      });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
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
