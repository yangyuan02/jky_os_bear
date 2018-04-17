<template>
  <div class="login-wrap">
    <div class="login_box">
      <div class="ms-title">后台管理系统</div>
      <div class="login_content">
        <div class="ms-login">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #324157
  }
  .login-wrap .login_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .login-wrap .login_box .login_content {
    height: 240px;
    width: 340px;
    background: #fff;
    padding: 40px;
    border-radius: 4px;
    margin-top: 30px;
  }
  .login-wrap .login_content .login-btn button {
    width: 100%;
    height: 36px;
  }
  .login-wrap .login_box .ms-title {
    font-size: 30px;
    color: #fff;
  }
</style>
