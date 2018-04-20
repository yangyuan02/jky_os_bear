<template>
    <div class="user_wrapper">
        <el-row class="usre_head">
            <el-col :span="22">
                <el-button type="primary" size="medium" @click="dialogFormVisible = true">添加</el-button>
                <el-button type="primary" size="medium">导入</el-button>
            </el-col>
            <el-col :span="2" style="display: flex;align-items: center;">
                <i class="el-icon-download" style="color:#409EFF;font-size:20px;"></i>
                <a href="javascript:;" style="color:#409EFF;">下载模板</a>
            </el-col>
        </el-row>
        <el-table :data="userList" stripe style="width: 100%;border:1px solid #eee;" class="user_body">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <el-table-column prop="province" label="省份筛选">
            </el-table-column>
            <el-table-column prop="role_id" label="角色筛选">
            </el-table-column>
            <el-table-column label="操作">
            </el-table-column>
        </el-table>
        <div class="pape">
            <el-pagination background layout="prev, pager, next" :total="100">
            </el-pagination>
        </div>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="项目" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in planLists" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省份" :label-width="formLabelWidth">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: ''
                },
                formLabelWidth: '100px',
                userList: [],
                planLists: [],
                value:''
            }
        },
        methods: {
            getUserList() { //获取用户列表
                this.$ajax.get("/api/admin/users").then((res) => {
                    this.userList = res.data.data
                }, (err) => {})
            },
            getYearPlans() { //获取年度计划列表
                this.$ajax.get("/api/admin/plans").then((res) => {
                    this.planLists = res.data.data.filter((item)=>{
                        return item.state == 'active'
                    })
                }, (err) => {
                    console.log()
                })
            },
            getRolesList(id) { //获取角色列表
                this.$ajax.get(`/api/admin/roles?plan_id=${id}`).then((res) => {
                    console.log(res)
                }, (err) => {})
            }
        },
        mounted() {
            this.getUserList()
            this.getYearPlans()
            // this.getRolesList(2)
        }
    }
</script>

<style scoped lang="less">
    .user_wrapper {
        .usre_head {
            display: flex;
            align-items: center;
        }
        .user_body {
            margin-top: 20px;
        }
        .pape {
            width: 100%;
            display: flex;
            margin-top: 20px;
            justify-content: center;
        }
    }
</style>


