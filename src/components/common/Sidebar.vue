<template>
  <div style="height:100%">
    <el-col :span="12" style="height:100%">
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#909399">
        <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">年度计划</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-location"></i>
        <span slot="title">季度计划</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">月度计划</span>
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
