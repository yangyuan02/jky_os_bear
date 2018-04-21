<template>
    <div class="point-main">
        <h3 class="point-main-top">测评点详情</h3>
        <div class="point-explain">
            <p class="explain-title">测评点1.1.1</p>
            <p class="explain-content">全面建成小康社会与全面建成社会主义现代化强国</p>
        </div>
        <p class="point-person">网评专家详情</p>
        <div class="point-person-content">
            <ul>
                <li  @click="dialogTableVisible = true"><i class="el-icon-plus"></i></li>
                <li class="li-on">
                    <p class="expert-name">专家1</p>
                    <p class="phone">13800000001</p>
                </li>
                <li class="li-on">
                    <p class="expert-name">专家1</p>
                    <p class="phone">13800000001</p>
                </li>
                <li class="li-on">
                    <p class="expert-name">专家1</p>
                    <p class="phone">13800000001</p>
                </li>
                <li class="li-on">
                    <p class="expert-name">专家1</p>
                    <p class="phone">13800000001</p>
                </li>
                <li class="li-on">
                    <p class="expert-name">专家1</p>
                    <p class="phone">13800000001</p>
                </li>
            </ul>
        </div>
        <!-- 添加专家弹框 -->
        <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->

        <el-dialog title="网评专家" :visible.sync="dialogTableVisible">
        <el-table :data="gridData">
            <el-table-column property="date" label="姓名" width="150"></el-table-column>
            <el-table-column property="name" label="手机号" width="200"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click=""><i class="el-icon-news" style="color:#f7b241"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        gridData: [{
          date: '专家1',
          name: '13781209126',
        }, {
          date: '专家1',
          name: '13781209126',
        }, {
          date: '专家1',
          name: '13781209126',
        }, {
          date: '专家1',
          name: '13781209126',
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    }
 }
</script>
<style  scoped lang="less">
    @main-clolr: #409EFF;
    @text-color: #909399;
    .point-main{
      .point-main-top{
          font-size: 16px;
      }
      .point-explain{
          width:517px;
          min-height: 120px;
          border: 1px solid @main-clolr;
          box-sizing:border-box;
          border-radius: 5px;
          padding: 12px;
          margin-top: 20px;
         .explain-title{
             font-size: 16px;
             color: @main-clolr;
         }
         .explain-content{
            margin-top: 15px;
            font-size: 14px;
            color: @text-color;
            font-weight: 200;
         }
      }
      .point-person{
          font-size: 14px;
          margin-top: 30px;
          color: @text-color;
      }
      .point-person-content{
          width: 1050px;
          margin-top: 15px;
          li{
              float: left;
              width: 113px;
              height: 50px;
              border: 1px dotted #dcdfe6;
              border-radius: 4px;
              text-align: center;
              line-height: 50px;
              font-size:18px;
              margin-right: 15px;
              margin-bottom: 15px;
              cursor: pointer;
          }
          .li-on{
              height: 36px;
              border-color:@main-clolr;
              border-style: solid;
              font-size: 14px;
              line-height: 18px;
              padding: 7px 0;
              .expert-name{
                  color: @main-clolr;
              }
              .phone{
                  color: @text-color;
              }
          }
      }
    }
</style>

