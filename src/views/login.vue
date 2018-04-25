<template>
    <div class="login-wrap">
        <div class="login_box">
            <div class="ms-title">后台管理系统</div>
            <div class="login_content">
                <div class="ms-login">
                    <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                        <el-form-item prop="username" >
                            <el-input v-model="ruleForm.account" placeholder="username" ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        </el-form-item>
                        <div class="login-btn" @click="login">
                            <el-button type="primary">登录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import jsrsasign from 'jsrsasign'
    export default {
        data() {
            return {
                ruleForm: {
                    account: '',
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
        },
        methods: {
            creatCode() { //生成验证码
                this.$ajax.get("/api/captcha/show", {}).then((res) => {
                    console.log(res)
                }, (err) => {})
            },
            login(){
                // console.log(this.ruleForm.username)
                this.$ajax.post("/api/admin_token",this.ruleForm).then((res)=>{
                    if (res.data.jwt) {
                        var token = res.data.jwt
                        var user = jsrsasign.KJUR.jws.JWS.parse(token).payloadObj
                        console.log(user)
                        window.localStorage.setItem("token", JSON.stringify(token))
                        window.localStorage.setItem("plan", JSON.stringify(user.plan))//获取planId
                        window.localStorage.setItem("planName", JSON.stringify(user.plan_name))//获取plan_name
                        this.$router.push('./home/detail')
                    }
                },(err)=>{})
            }
        },

        mounted(){
            // this.creatCode()
        }
    }
</script>

<style scoped lang="less">
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: #324157;
        .login_box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .login_content {
                height: 240px;
                width: 340px;
                background: #fff;
                padding: 40px;
                border-radius: 4px;
                margin-top: 30px;
                .login-btn button {
                    width: 100%;
                    height: 36px;
                }
            }
        }
        .ms-title {
            font-size: 30px;
            color: #fff;
        }
    }
</style>
