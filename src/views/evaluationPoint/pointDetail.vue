<template>
    <div class="point-main">
        <h3 class="point-main-top">测评点详情{{this.$route.params.pointId}}</h3>
        <div class="point-explain">
            <p class="explain-title">测评点</p>
            <p class="explain-content">{{content}}</p>
        </div>
        <p class="point-person">网评专家详情</p>
        <div class="point-person-content">
            <ul>
                <li  @click="dialogFormVisible = true"><i class="el-icon-plus"></i></li>
                <li class="li-on" v-for="expert in expertList">
                    <p class="expert-name">{{expert.name}}</p>
                    <p class="phone">{{expert.mobile}}</p>
                </li>
            </ul>
        </div>
        <!-- 添加专家弹框 -->
        <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->

        <el-dialog title="网评专家" :visible.sync="dialogFormVisible" @close="closeDialog" width="40%">

           <div>
               <el-input
                placeholder="请输入手机号"
                prefix-icon="el-icon-search"
                v-model="phone"
                @keyup.enter.native="getNetworkExpert"
                style="width:80%">
                </el-input>
                <el-button type="primary" style="width:15%;margin-left:20px;" @click="getNetworkExpert">搜索</el-button>
            </div>
            <div style="margin-top:20px">
                <el-table :data="gridData" style="width: 100%" height="350" @selection-change="handleSelectionChange">
                    <el-table-column property="date" label="姓名" width="200"></el-table-column>
                    <el-table-column property="name" label="手机号" width="200"></el-table-column>
                    <el-table-column
                        type="selection"
                        width="100">
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="bindExpert" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        content:'',
        expertList:[],
        gridData: [],
        dialogFormVisible: false,
        phone:'',
        checkList:[],
        multipleSelection: [],
        formLabelWidth: '120px'
      };
    },
    mounted(){
        this.getPointDetail();
        this.getNetworkExpert();
        this.getCheckedExpert();
    },
    methods:{
        getPointDetail(){
            this.$ajax.post('/api/admin/assessments/find_one',{'id':this.$route.params.pointId}).then((res) => {
                console.log(res,res.data)
                this.content=res.data.data;
            },(err)=>{})
        },
        getCheckedExpert(){
             this.$ajax.post('/api/admin/assessments/find_all_expert_user',{'assessment_id':this.$route.params.pointId}).then((res) => {
                console.log(res,res.data)
                this.expertList=res.data.data;
            },(err)=>{})
        },
        getNetworkExpert(){
            this.$ajax.post('/api/admin/users/wangping_expert_user',{'keyword':this.phone}).then((res) => {
                var data = []
                for (var i = 0; i < res.data.data.length; i++) {
                    var obj = {}
                    obj.date = res.data.data[i].name
                    obj.name = res.data.data[i].mobile
                    obj.id = res.data.data[i].id
                    data[i] = obj
                }
                this.gridData = data
            },(err)=>{})
        },
        closeDialog(){
            this.phone='';
            // this.getNetworkExpert();
        },
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
        },
        bindExpert(){
            this.dialogFormVisible = false;
            console.log(this.multipleSelection);
            var checkedExperList = this.multipleSelection;
            var checkedExpertIds=[];
            for (var i = 0; i < checkedExperList.length; i++) {
                checkedExpertIds.push(checkedExperList[i].id)
            }
            checkedExpertIds = checkedExpertIds.join(',');
            this.$ajax.post('/api/admin/assessment_experts',{'assessment_id':this.$route.params.pointId,'expert_ids':checkedExpertIds}).then((res) => {
                console.log(res)
                this.getCheckedExpert();
            },(err)=>{})
        }
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
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .phone{
                  color: @text-color;
              }
          }
      }
    }
</style>

