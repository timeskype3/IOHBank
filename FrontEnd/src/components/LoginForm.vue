<template>
  <div class="LoginForm">
    <a-layout id="components-layout">
      <a-layout-header>
        <img alt="Vue logo" src="../assets/coverwhite.png" 
        height="210"
        width="180"
        />
        </a-layout-header>
      <a-layout-content>
        <h1>Login</h1>
    <a-form  :form="form"  @submit="handleSubmit" >
    <a-form-item
         :label-col="{ span: 4  }"
         :wrapper-col="{ span: 8 ,offset: 8}"
         :validate-status="userNameError() ? 'error' : ''"
         :help="userNameError() || ''" 
    >
    <a-alert  v-if="showwrong"
              message="Username or Password incorrect." 
              type="error" 
              banner />
   <a-alert   v-if="showsuc"
              message="Login successful."
              type="success"
              banner />
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
    <a-col :span="24" :style="{ textAlign: 'center' }" >
    <a-form-item >
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
      >
        Remember me
      </a-checkbox>
      <a-button
        :style="{ marginLeft: '15px' }"
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
        @click="login()"
      >
        Log in
      </a-button>  
        Or <a  @click="register()">
        register now!
      </a> 
    </a-form-item>
     <a
        class="login-form-forgot"
        href=""
      >
        Forgot password
      </a>
    </a-col>
  </a-form>
  
          </a-layout-content>
      <a-layout-footer>
          InOurHeartBank coryright
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
    
  data () {

    return {
      hasErrors,
      user: '',
      password: '',
      form: this.$form.createForm(this),
      showwrong: false,
      showsuc: false
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
        axios.post('//localhost:3000/login', {
            user: this.user,
            password: this.password
        }).then(res => {
          console.log('res', res.data)
            if(res.data.token) {
                this.showwrong=false
                this.showsuc=true
                localStorage.setItem("token", res.data.token)
                setTimeout(()=>this.$router.push('/dashboard'),1200)
            }
        }).catch((e) => {
          e.response
           this.showwrong=true
          }) 
    },
    register(){
      this.$router.push('/register')
    },
    
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
  min-height: 300px;
}
#components-layout > .ant-layout {
  margin-bottom: 40px;
}
#components-layout > .ant-layout:last-child {
  margin: 0;
}
</style>
