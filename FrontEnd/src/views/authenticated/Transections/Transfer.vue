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
          label="To Bank"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
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
            v-model="AccountIDRecive"
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
            v-model="Money"
            v-decorator="[
              'Amount',
              {
                rules: [{ required: true, message: 'Please input your money' }]
              }
            ]"
          />
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
          "
        >
          Next
        </a-button>

        <a-modal v-model="visible" title="Transaction" on-ok="handleOk">
          <template slot="footer">
            <a-button key="back" @click="handleCancel">Cancel</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              Confirm
            </a-button>
          </template>
          <template v-if="checkaccount[0]">
            <p>From</p>
            <p>{{ profile.FName + " " + profile.LName }}</p>
            <p>Account ID : {{ AccountID }}</p>
            <br />
            <p>
              <a-icon
                type="dollar"
                style="fontSize:120px;margin-left:30px;"
              /><a-icon
                style="fontSize:120px; margin-left:30px;"
                type="right"
              />
            </p>
            <div style="margin-left:320px;">
              <p>To</p>
              <p>{{ checkaccount[0].FName + " " + checkaccount[0].LName }}</p>
              <p>Account ID : {{ checkaccount[0].AccountID }}</p>
              <p>Amount {{ Money }} Baht.</p>
            </div>
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
      bank: "IOHBANK",
      profile: {},
      read: {},
      checkaccount: [],
      readMoney: [],
      AccountID: "",
      Money: "",
      Memo: "",
      Date: new Date(),
      AccountIDRecive: "",
      loading: false,
      visible: false,
      Star: 0
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
    check() {
      api()
        .get("/account/transfer/read/" + this.AccountIDRecive)
        .then(({ data }) => {
          this.checkaccount = data;
        });
    },

    readM() {
      api()
        .get("/account/transfer/checkmoney/" + this.AccountID)
        .then(({ data }) => {
          this.readMoney = data;
        });
    },

    handleCancel() {
      this.visible = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(err => {
        if (!err) {
          this.SubmitTransfer();
        }
      });
    },
    SubmitTransfer() {
      this.readM();
      if (this.readMoney[0].Balance > this.Money) {
        this.send();
        this.receive();
        this.bill();
        this.visible = false;
      } else {
        this.$message.error("Sorry, Can't transfer");
        this.openNotification();
      }
    },

    bill() {
      axios
        .post("//localhost:3000/account/transfer/bill", {
          AccountID: this.AccountID,
          AccountIDRecive: this.AccountIDRecive,
          Money: this.Money,
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
    receive() {
      axios
        .post("//localhost:3000/account/transfer/receive", {
          AccountID: this.AccountIDRecive,
          Balance: this.Money
        })
        .then(() => {
          this.$message.success("Receive Success!");
        })
        .catch(() => {
          this.$message.error("Sorry, Can't get to receive");
        });
    },
    send() {
      axios
        .post("//localhost:3000/account/transfer/send", {
          AccountID: this.AccountID,
          Balance: this.Money
        })
        .then(() => {
          this.$message.success("Send Success!");
        })
        .catch(() => {
          this.$message.error("Sorry, Can't send");
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
