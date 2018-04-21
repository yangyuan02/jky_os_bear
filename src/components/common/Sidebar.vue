<template>
  <div style="height:100%">
    <el-col :span="12" style="height:100%">
      <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#909399">

        <!-- <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">项目管理</span>
        </el-menu-item> -->

        <!-- <router-link :to="{name:'IndexMainDetail',params:{planId:this.planId}}"> -->
            <el-menu-item index="/home/detail">
                <i class="el-icon-location"></i>
                <span slot="title">角色管理</span>
            </el-menu-item>
        <!-- </router-link> -->

            <el-menu-item index="/home/expertGroup">
                <i class="el-icon-setting"></i>
                <span slot="title">专家组</span>
            </el-menu-item>


            <el-menu-item index="/home/evaluationPoint">
                <i class="el-icon-setting"></i>
                <span slot="title">测评点</span>
            </el-menu-item>


            <el-menu-item index="/home/user">
                <i class="el-icon-setting"></i>
                <span slot="title">用户</span>
            </el-menu-item>

    </el-menu>
  </el-col>
  </div>
</template>



<style>
  .el-menu-vertical-demo{
    width: 199px;
    height: 100%;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
          planId:window.localStorage.getItem("plan"),
          isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
