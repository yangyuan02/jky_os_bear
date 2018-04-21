<template>
  <div style="height:100%">
    <el-col :span="12" style="height:100%">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#909399">
        <router-link to="/home">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">项目管理</span>
            </el-menu-item>
        </router-link>
        <router-link to="/home">
            <el-menu-item index="2">
                <i class="el-icon-location"></i>
                <span slot="title">角色管理</span>
            </el-menu-item>
        </router-link>
        <router-link to="/home/expertGroup">
            <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">专家组</span>
            </el-menu-item>
        </router-link>
        <router-link to="/home/evaluationPoint">
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">测评点</span>
            </el-menu-item>
        </router-link>
        <router-link to="/home/user">
            <el-menu-item index="5">
                <i class="el-icon-setting"></i>
                <span slot="title">用户</span>
            </el-menu-item>
        </router-link>
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
