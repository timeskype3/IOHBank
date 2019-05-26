<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
  
  <a-form-item
      v-bind="formItemLayout"
      label="Name"
    >

      <a-input 
      placeholder = "Please enter your Name"
        v-decorator="[
          'Name',
          {
            rules: [{
              type: 'text', message: 'The input is Invalid Name',
            }, {
              required: true, message: 'Please input your Name',
            }]
          }
        ]"
      />
    
     </a-form-item>

<a-form-item
      v-bind="formItemLayout"
      label="Surname"
    >
      <a-input 
      placeholder = "Please enter your Surname"
        v-decorator="[
          'Surname',
          {
            rules: [{
              type: 'Text', message: 'The input is  Invalid Surname',
            }, {
              required: true, message: 'Please input your Surname',
            }]
          }
        ]"
      />
</a-form-item>

<a-form-item
      v-bind="formItemLayout"
      label="DOB"
    >
  <a-date-picker 
      placeholder = "YYYY/MM/DD"
      style="width: 100%"
            
    />
 </a-form-item>

<a-form-item
      v-bind="formItemLayout"
      label="Nationality"
    >
      <a-select
      placeholder = "Please select your nationality"
        v-decorator="[
          'Nationality',

          {
            rules: [{
              required: true, message: 'Please select your Nationality',
            }]
          }
        ]"
      >
      <a-select-option value="Thai"> thai </a-select-option>
      </a-select>
    </a-form-item>

<a-form-item
      v-bind="formItemLayout"
      label="NationalID"
    >
      <a-input
      placeholder = "Pleasre enter your NaionalID"
      
        v-decorator="[
          'NationalID',
          {
            rules: [{
              type: 'number', message: 'The input is Invalid NationalID',
            }, {
              required: true, message: 'Please input your NationalID',
            }]
          }
        ]"
      />
</a-form-item>

<a-form-item
      v-bind="formItemLayout"
      label="BloodType"
    >
      <a-select
        placeholder = "PLease select your bloodtype"
        v-decorator="[
          'bloodtype',
          {
            rules: [{
              required: true, message: 'Please select your Bloodtype',
            }]
          }
        ]"
      >
      <a-select-option value="A"> A </a-select-option>
      <a-select-option value="B"> B </a-select-option>
      <a-select-option value="O"> O </a-select-option>
      <a-select-option value="AB"> AB </a-select-option>
      </a-select>
    </a-form-item>

 <a-form-item
      v-bind="formItemLayout"
      label="E-mail"
    >
      <a-input
        placeholder = "Please enter your E-mail"
        v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }]
          }
        ]"
      />
    </a-form-item>

    <a-form-item
      v-bind="formItemLayout"
      label="Password"
    >
      <a-input
        placeholder = "Please enter your password"
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>

    <a-form-item
      v-bind="formItemLayout"
      label="Confirm Password"
    >
      <a-input
        placeholder = "Please re-enter your password"
        v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    
    <a-form-item
      v-bind="formItemLayout"
      label="Phone Number"
    >
      <a-input
        placeholder = "Please enter your phone number"
        v-decorator="[
          'phone',
          {
            rules: [
            { required: true, message: 'Please input your phone number!' }],
          }
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="[
            'prefix',
            { initialValue: '+66' }
          ]"
          style="width: 70px"
        >
          <a-select-option value="+66">
            +66
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    
    <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox
        v-decorator="['agreement', {valuePropName: 'checked'}]"
      >
        I have read the <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button
        type="primary"
        html-type="submit"
      >
        Register
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

export default {
     name: "RegisterForm",
  data () {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 6 },
          sm: { span: 8 },
         
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 8,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange  (value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
  },
};
</script>