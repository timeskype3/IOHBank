<template>
  <div class="login">
    <a-layout id="components-layout">
      <a-layout-header>
          <img alt="Vue logo" src="../assets/logo.png" />
          </a-layout-header>
      <a-layout-content>
         <FormLogin/>
          </a-layout-content>
      <a-layout-footer>
          Jirayu coryright
          </a-layout-footer>
    </a-layout>
    <h1>This is an about page</h1>
    <a-form layout="inline" :form="form"  @submit="handleSubmit">
    <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
      :help="userNameError() || ''"
    >
      <a-input
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
    >
      <a-input
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
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="hasErrors(form.getFieldsError())"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data () {
    return {
      hasErrors,
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
  background: #7dbcea;
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
  background: rgb(4, 61, 102);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout > .ant-layout {
  margin-bottom: 40px;
}
#components-layout > .ant-layout:last-child {
  margin: 0;
}

</style>

</script>
