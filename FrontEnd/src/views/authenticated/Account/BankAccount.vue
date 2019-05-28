<template>
  <div>
    <a-card
      v-for="(item, i) in read"
      :key="i"
      :title="'Account ID : ' + item.AccountID"
      :style="{ marginTop: '16px' }"
    >
      <a slot="extra" href="#">More</a>
      {{ item }}
    </a-card>
    <br /><br />
    <a-button type="primary" @click="showDrawer">
      <a-icon type="plus" /> Open new Bank Account
    </a-button>
    <a-drawer
      title="Create a new Bank Account"
      :width="720"
      :visible="visible"
      :wrap-style="{
        height: 'calc(100% - 108px)',
        overflow: 'auto',
        paddingBottom: '108px'
      }"
      @close="onClose"
    >
      <a-form
        :form="form"
        layout="vertical"
        hide-required-mark
        type="primary"
        @click="showDrawer"
        @submit="handleSubmit"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item>
              {{ "Client ID :" + "  " + profile.ClientID }}</a-form-item
            >
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="Account Type">
                <a-select
                  v-model="AccountType"
                  default-value="1"
                  style="width: 120px"
                  @change="handleChange"
                >
                  <a-select-option value="1">Saving</a-select-option>
                  <a-select-option value="2">Fixed</a-select-option>
                  <a-select-option value="3">Current</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Balance">
                <a-input
                  v-model="Balance"
                  v-decorator="[
                    'Balance',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Specifiy amount such as 200.50'
                        }
                      ]
                    }
                  ]"
                  placeholder="Input amount in Baht."
                />
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
        <div
          :style="{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right'
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Cancel
          </a-button>
          <a-button type="primary" @click="Account()">
            Submit
          </a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import api from "@/utils/api";
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  data() {
    return {
      AccountType: "1",
      Balance: "",
      Bank: "IOHBank",
      form: this.$form.createForm(this),
      visible: false,
      profile: {},
      read: {},
      formItemLayout: {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 9 },
          sm: { span: 15 }
        }
      }
    };
  },
  computed: {
    name() {
      return jwt.decode(localStorage.getItem("token"));
    }
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
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    setCodeAndLabelForForm: function(selectedIndex) {
      var selectedIdea = this.ideas[selectedIndex];
      this.currentForm = {
        ideaCode: selectedIdea.code,
        text: selectedIdea.text
      };
    },
    Account() {
      axios
        .post("//localhost:3000/account", {
          AccountType: this.AccountType,
          ClientID: this.profile.ClientID,
          Balance: this.Balance,
          Bank: this.Bank
        })
        .then(() => {
          this.$message.success("Create Success!");
        })
        .catch(() => {
          this.$message.error("Invalid, Plase input the correct one!");
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(err => {
        if (!err) {
          this.Account();
        }
      });
    }
  }
};
</script>
