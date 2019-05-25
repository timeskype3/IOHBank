<template>
  <div class="LoginForm">
    <a-layout id="components-layout">
      <a-layout-header>
          <img alt="Vue logo" src="../assets/logo.png" />
          </a-layout-header>
      <a-layout-content>
         <h1>Login IOH</h1>
    <a-form  :form="form"  @submit="handleSubmit" >
    <a-form-item
         :label-col="{ span: 4  }"
         :wrapper-col="{ span: 8 ,offset: 8}"
         :validate-status="userNameError() ? 'error' : ''"
         :help="userNameError() || ''"
     
    >
      <a-input
        v-model="user"
        v-decorator="[
          'userName',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color:rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item
      :validate-status="passwordError() ? 'error' : ''"
      :help="passwordError() || ''"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 8 ,offset: 8}"
    >
      <a-input
        v-model="password"
        v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color:rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
        @click="login()"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
          </a-layout-content>
      <a-layout-footer>
          Jirayu coryright
          </a-layout-footer>
    </a-layout>
    
  </div>
</template>

<script>
import axios from 'axios'

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
    name: "LoginForm",
  data () {
    return {
      hasErrors,
      user: '',
      password: '',
      form: this.$form.createForm(this),
    };
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    login() {
        axios.post('//localhost:3000/Login', {
            user: this.user,
            password: this.password
        }).then(res => {
            if(res.data.user.length === 1) {
                localStorage.setItem('user', this.user)
                localStorage.setItem('password', this.password)
                this.$router.push('/profile')
            } else {
                console.log('not found')
            }
        })
    }
  },
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
  background: #0d9b09;
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
 margin: 40px 0 0;
}
#components-layout > .ant-layout {
  margin-bottom: 40px;
}
#components-layout > .ant-layout:last-child {
  margin: 0;
}
</style>
