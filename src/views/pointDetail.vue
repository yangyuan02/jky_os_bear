<template>
 <div class="point_main">
    <h3 class="point_main_top">测评点详情</h3>
    <div class="point_explain">
     <p class="explain_title">测评点1.1.1</p>
     <p class="explain_content">全面建成小康社会与全面建成社会主义现代化强国</p>
    </div>
    <p class="point_person">网评专家详情</p>
    <div class="point_person_content">
       <ul>
        <li><i class="el-icon-plus"></i></li>
        <li>
            <p>专家1</p>
            <p>13800000001</p>
        </li>
       </ul>
    </div>
 </div>
</template>
<script>
 export default {

 }
</script>
<style  scoped lang="less">
    .point_main{
        margin:20px 0px 0px 30px;
      .point_main_top{
          font-size: 16px;
      }
      .point_explain{
          width:517px;
          min-height: 150px;
          border: 1px solid #409eff;
          box-sizing:border-box;
          border-radius: 5px;
          padding: 17px;
          margin-top: 34px;
         .explain_title{
             font-size: 16px;
             color: #409eff;
         }
         .explain_content{
            margin-top: 30px;
            font-size: 14px;
            color: #909399;
            font-weight: 200;
         }
      }
      .point_person{
          font-size: 14px;
          margin-top: 50px;
          font-weight: 200;
      }
      .point_person_content{
          width: 1050px;
          li{
              float: left;
              width: 113px;
              height: 53px;
              border: 1px dotted #dcdfe6;
              text-align: center;
              line-height: 53px;
              font-size:18px;
              font-weight: bolder;
          }
      }
    }
</style>

