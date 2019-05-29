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
          label="Payment ID :"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-model="paymentID"
            v-decorator="[
              'paymentID',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="From account ID"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          style="margin-top:20px"
          ><a-select
            v-model="AccountID"
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
                <div style="margin-left:10px;">
                  {{ "  " + item.Balance + "  Baht" }}
                </div>
              </div>
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="Note"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="Memo" />
        </a-form-item>

        <a-button
          type="primary"
          @click="
            showModal();
            check();
            paymentcheck();
          "
        >
          Next
        </a-button>

        <a-modal v-model="visible" title="Payment" on-ok="handleOk">
          <template slot="footer">
            <a-button key="back" @click="handleCancel">Cancel</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              Confirm
            </a-button>
          </template>
          <template v-if="!payment[0]">
            <p>Have no this PaymentID</p>
          </template>
          <template v-if="payment[0]">
            <a-card-grid style="width:40%; textAlign:'center'"
              >Payment ID :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].PaymentID
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Customer name :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].CustomerName
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Customer Address :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].CustomerAddress
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Total :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].Total
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'">
              EXP :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].EXP
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Type :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].Type
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Company Name :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].Name
            }}</a-card-grid>

            <a-card-grid style="width:40%; textAlign:'center'"
              >Contact :</a-card-grid
            >
            <a-card-grid style="width:60%; textAlign:'center'">{{
              payment[0].Contract
            }}</a-card-grid>

            <a-rate v-model="Star" />
            <span class="ant-rate-text">{{ Star }} stars</span>
          </template>
        </a-modal>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }"> </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import axios from "axios";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      payment: [],
      readMoney: [],
      AccountID: "",
      paymentID: "",
      Star: 0,
      read: {},
      Memo: "",
      Date: new Date(),
      visible: false
    };
  },
  mounted() {
    api()
      .get("/account/payment")
      .then(({ data }) => {
        this.profile = data;
      });
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

    paymentcheck() {
      api()
        .get("/account/payment/" + this.paymentID)
        .then(({ data }) => {
          this.payment = data;
        });
    },
    check() {
      api()
        .get("/account/transfer/read/" + this.AccountIDRecive)
        .then(({ data }) => {
          this.checkaccount = data;
        });
    },

    handleCancel() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          this.SubmitPayment();
        }
      });
    },
    readM() {
      api()
        .get("/account/transfer/checkmoney/" + this.AccountID)
        .then(({ data }) => {
          this.readMoney = data;
        });
    },
    orderbill() {
      axios
        .post("//localhost:3000/account/payment/orderbill", {
          AccountID: this.AccountID,
          PaymentID: this.paymentID,
          Date: this.Date,
          Memo: this.Memo,
          Star: this.Star
        })
        .then(() => {
          this.$message.success("Transfer Success!");
        })
        .catch(() => {
          this.$message.error("Sorry, Can't transfer");
        });
    },
    SubmitPayment() {
      this.readM();
      if (this.readMoney[0].Balance >= this.payment[0].Total) {
        this.send();
        this.orderbill();
      } else {
        this.$message.error("Sorry, Can't transfer");
        this.openNotification();
      }
    },
    RePage() {
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

    send() {
      axios
        .post("//localhost:3000/account/transfer/send", {
          AccountID: this.AccountID,
          Balance: this.payment[0].Total
        })
        .then(() => {
          this.RePage();
          this.$message.success("Payment Success!");
        })
        .catch(() => {
          this.$message.error("Sorry, Can't pay");
        });
    },

    openNotification() {
      this.$notification.open({
        placement: "buttomRight",
        message: "Sorry your money not enough",
        description:
          "Your account has insufficient funds for this transaction.",
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
