<template>
    <div class="wrapper">
        <div class="content on-plan">
            <p class="title">进行中的计划</p>
            <ul class="on-plan-list">
                <li @click="dialogFormVisible = true">
                    <i class="el-icon-plus"></i>
                </li>
                <li class="on-li"  v-for="onPlain in onPlainList" :data-id="onPlain.id">
                    <p class="plan-name">{{onPlain.name}}</p>
                    <p class="roles">
                        <span class="roles-left">角色</span>
                        <span class="roles-right">10个</span>
                    </p>
                    <p class="plan-button">
                        <router-link to="/home/detail" class="three">
                            <span class="manage-btn">
                          <i class="el-icon-search"></i>
                          管理
                        </span>
                        </router-link>
                        <span class="file-btn">
                        <i class="el-icon-message"></i>
                        归档
                      </span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="content finished-plan">
            <p class="title">已归档的计划</p>
            <ul class="on-plan-list finished-plan-list">
                <li class="on-li"  v-for="filePlain in filePlainList" :data-id="filePlain.id">
                    <p class="plan-name">{{filePlain.name}}</p>
                    <p class="roles">
                        <span class="roles-left">角色</span>
                        <span class="roles-right">10个</span>
                    </p>
                    <p class="plan-time">
                        <span> 归档时间：</span> <span>2018.5.16</span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- Form -->
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="addYearPlans">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                formLabelWidth: '60px',
                planLists:[],
                onPlainList:[],
                filePlainList:[]

            };
        },
        methods: {
            getYearPlansList() { //获取年计划列表
                this.$ajax.get("/api/admin/plans").then((res) => {
                    console.log(res)
                    if(res.status==200){
                      // 全部计划
                      this.planLists = res.data.data;
                      // 筛选出正在进行的计划
                      this.onPlainList = this.planLists.filter(function (data) {
                          return data.state == 'active'
                      });
                      // 筛选已经归档的计划
                      this.filePlainList = this.planLists.filter(function (data) {
                          return data.state == 'archived'
                      });
                    }

                }, (err) => {})
            },
            addYearPlans(){//添加计划
                this.$ajax.post("/api/admin/plans",{"name":this.form.name, "state":'active'}).then((res) => {
                    console.log(res)
                    if(res.data.success){
                      this.dialogFormVisible=false;
                      this.getYearPlansList();
                    }
                },(err)=>{})
            }
        },
        mounted(){
            this.getYearPlansList()
        }
    }
</script>

<style lang="less" scoped>
    @main-clolr: #409EFF;
    @text-color: #909399;
    .wrapper {
        .content {
            color: @text-color;
            .title {
                font-size: 14px;
            }
            .on-plan-list {
                overflow: hidden;
                margin-top: 20px;
                margin-right: -20px;
                li {
                    float: left;
                    width: 258px;
                    height: 178px;
                    border: 1px dotted #dcdfe6;
                    border-radius: 5px;
                    text-align: center;
                    line-height: 180px;
                    font-size: 14px;
                    margin-right: 22px;
                    margin-bottom: 22px;
                    cursor: pointer;
                }
                .on-li {
                    border-color: @main-clolr;
                    border-style: solid;
                    line-height: 24px;
                    p {
                        margin: 25px auto;
                    }
                    .plan-name {
                        font-size: 16px;
                        color: @main-clolr;
                    }
                    .roles {
                        color: #606266;
                        .roles-left {
                            padding-right: 30px;
                        }
                    }
                    .plan-button {
                        .manage-btn {
                            color: #ffbd3d;
                            padding-right: 20px;
                        }
                    }
                }
            }
        }
        .on-plan {
            border-bottom: 1px solid #e6e6e6;
            margin-left: -20px; // margin-right: -2px;
            padding: 0 0 20px 20px;
        }
        .finished-plan {
            margin-top: 20px;
        }
    }
</style>


