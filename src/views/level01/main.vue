<template>
  <div class="wrapper">
    <div class="content on-plan">
      <p class="title">进行中的计划</p>
      <ul class="on-plan-list">
        <li>
          <i class="el-icon-plus"></i>
        </li>
        <li class="on-li">
            <p class="plan-name">设计工作</p>
            <p class="roles">
              <span class="roles-left">角色</span>
              <span class="roles-right">10个</span>
            </p>
            <p class="plan-button">
              <span class="manage-btn">
                <i class="el-icon-search"></i>
                管理
              </span>
              <span class="file-btn">
                <i class="el-icon-message"></i>
                归档
              </span>
            </p>
        </li>
        
      </ul>
    </div>
    <div class="content finished-plan">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  @main-clolr:#409EFF;
  @text-color:#909399;
  .wrapper{
    .content{
      color: @text-color;
      .title{
        font-size: 14px;
      }
      .on-plan-list{
        overflow: hidden;
        margin-top: 20px;
        margin-right: -28px;
       li{
          float: left;
          width: 258px;
          height: 178px;
          border: 1px dotted #dcdfe6;
          border-radius: 5px;
          text-align: center;
          line-height: 180px;
          font-size: 14px;
          margin-right: 28px;
          margin-bottom: 28px;
          cursor: pointer;
       }
       .on-li{
         border-color: @main-clolr;
         border-style: solid;
         line-height: 24px;
         p{
           margin: 25px auto;
         }
         .plan-name{
            font-size: 16px;
            color: @main-clolr;
         }
         .roles{
           color: #606266;
           .roles-left{
             padding-right: 30px;
           }
         }
         .plan-button{
           .manage-btn{
             color: #ffbd3d;
             padding-right: 20px;
           }
         }
       }
      }
    }
    .on-plan{
      border-bottom: 1px solid #e6e6e6;
      margin-left: -20px;
      margin-right: -12px;
      padding: 0 20px 50px 20px;   
    }
  }
</style>


