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
        <a-button type="primary" @click="showModal">
          Next
        </a-button>
        <a-modal v-model="visible" title="Title" on-ok="handleOk">
          <template slot="footer">
            <a-button key="back" @click="handleCancel">Return</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              Submit
            </a-button>
          </template>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </a-modal>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }"> </a-form-item>
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
      accountID: {},
      loading: false,
      visible: false
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
    showModal() {
      this.visible = true;
    },

    handleCancel() {
      this.visible = false;
    },
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
    },
    openNotification() {
      this.$notification.open({
        placement: "buttomRight",
        message: "Your username is already taken.",
        description:
          "Please check you username. It not depend on sensitive case.",
        icon: <a-icon type="frown" style="color: #FF0033	" />
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
