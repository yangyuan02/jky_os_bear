<template>
    <Header>
        <div class="system">
            省级政府履行教育职责测评系统-{{this.planName}}
        </div>
        <div class="peren">
            <el-dropdown>
                <el-button type="primary">
                    admin<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </Header>
</template>

<script>
    export default {
        data() {
            return {
                planName: window.localStorage.getItem("planName"),
            }
        },
        methods:{
            logout(){ //el-dropdown-item没有click事件
                window.localStorage.removeItem("token")
                this.$router.replace({
                    "path": "/"
                })
            }
        }
    }
</script>

<style>
    Header {
        height: 100%;
        width: 100%;
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>


