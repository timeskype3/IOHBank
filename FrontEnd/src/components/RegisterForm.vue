<template>
  <div class="register">
    <a-layout id="components-layout1">
      <a-layout-header>
        <img
          alt="Vue logo"
          src="../assets/coverwhite.png"
          height="55"
          width="55"
        /> Register
      </a-layout-header>
      <a-layout-content>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="Name">
            <a-input
              v-model="FName"
              v-decorator="[
                'Name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your firstname!',
                      whitespace: true
                    }
                  ]
                }
              ]"
              placeholder="Please enter your Name"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Surname">
            <a-input
              v-model="LName"
              v-decorator="[
                'Surname',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your surname!',
                      whitespace: true
                    }
                  ]
                }
              ]"
              placeholder="Please enter your Surname"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Address">
            <a-textarea
              v-model="Address"
              v-decorator="['Address']"
              placeholder="Please enter your Address"
              autosize
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Gender">
            <a-radio-group
              v-model="Gender"
              button-style="solid"
              @change="handleSizeChange"
            >
              <a-radio-button value="Male">Male</a-radio-button>
              <a-radio-button value="Female">Female</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="DOB">
            <a-date-picker
              v-model="DOB"
              v-decorator="[
                'DOB',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Birthday please!'
                    }
                  ]
                }
              ]"
              placeholder="YYYY/MM/DD"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Nationality">
            <a-select
              v-model="Nationality"
              v-decorator="[
                'Nationality',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Nationality!',
                      whitespace: true
                    }
                  ]
                }
              ]"
              placeholder="Please select your nationality"
            >
              <a-select-option value="THA"> THA </a-select-option>
              <a-select-option value="USA"> USA </a-select-option>
              <a-select-option value="FRA"> FRA </a-select-option>
              <a-select-option value="JAP"> JAP </a-select-option>
              <a-select-option value="GER"> GER </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="NationalID">
            <a-input
              v-model="NationalityID"
              v-decorator="[
                'NationalID',
                {
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      len: 13,
                      message: 'Please input at least 13 digits!'
                    }
                  ]
                }
              ]"
              placeholder="Pleasre enter your NaionalID"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="BloodType">
            <a-select
              v-model="BloodType"
              v-decorator="[
                'bloodtype',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select the BloodType!',
                      whitespace: true
                    }
                  ]
                }
              ]"
              placeholder="PLease select your bloodtype"
            >
              <a-select-option value="A"> A </a-select-option>
              <a-select-option value="B"> B </a-select-option>
              <a-select-option value="O"> O </a-select-option>
              <a-select-option value="AB"> AB </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="E-mail">
            <a-input
              v-model="Email"
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                }
              ]"
              placeholder="Please enter your E-mail"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Phone Number">
            <a-input
              v-model="Tel"
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your phone number!'
                    }
                  ]
                }
              ]"
              placeholder="Please enter your phone number"
              style="width: 100%"
            >
              <a-select
                slot="addonBefore"
                v-decorator="['prefix', { initialValue: '+66' }]"
                style="width: 70px"
              >
                <a-select-option value="+66"> +66 </a-select-option>
                <a-select-option value="+1"> +1 </a-select-option>
                <a-select-option value="+33"> +33 </a-select-option>
                <a-select-option value="+81"> +81 </a-select-option>
                <a-select-option value="+49"> +49 </a-select-option>
              </a-select>
            </a-input>
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Create Username">
            <a-input
              v-model="Username"
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please create Username!',
                      whitespace: true
                    }
                  ]
                }
              ]"
              placeholder="Please enter your Username"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Password">
            <a-input
              v-model="Password"
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                }
              ]"
              placeholder="Please enter your password"
              type="password"
            />
          </a-form-item>

          <a-form-item v-bind="formItemLayout" label="Confirm Password">
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                }
              ]"
              placeholder="Please re-enter your password"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>

          <a-form-item v-bind="tailFormItemLayout">
            <a-checkbox
              v-decorator="['agreement', { valuePropName: 'checked' }]"
            >
              I have read the
              <a href="">
                agreement
              </a>
            </a-checkbox>
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">
              Register
            </a-button>
          </a-form-item>
        </a-form>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      FName: "",
      LName: "",
      Tel: "",
      Address: "",
      Gender: "",
      DOB: "",
      Nationality: "",
      NationalityID: "",
      BloodType: "",
      Email: "",
      Username: "",
      Password: "",
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 6 },
          sm: { span: 6 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 8,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    create() {
      axios
        .post("//localhost:3000/register", {
          FName: this.FName,
          LName: this.LName,
          Address: this.Address,
          Tel: this.Tel,
          Gender: this.Gender,
          DateOfBirth: this.DOB,
          Nationality: this.Nationality,
          IDCardNumber: this.NationalityID,
          BloodType: this.BloodType,
          Email: this.Email,
          Username: this.Username,
          Password: this.Password
        })
        .then(res => {
          this.$message.success("Create Success!");
          setTimeout(() => this.$router.push("/login"), 600);
        })
        .catch(() => {
          this.openNotification();
          this.$message.error("Invalid, Plase input the correct one!");
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(err => {
        if (!err) {
          this.create();
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
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
<style>
#components-layout1 {
  text-align: center;
  background-image: url("bg-1.jpg");
  height: 959px;
}

#components-layout1 .ant-layout-content {
  background-image: url("bg-1.jpg");
  height: 959px;
  min-height: 1000px;
  margin-top: 40px;
}
#components-layout1 .ant-layout-header {
  min-height: 20px;
  background-image: url("bg-1.jpg");
  color: #fff;
  font-size: 30px;
}
</style>
