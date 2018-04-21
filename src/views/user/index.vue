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
            <el-table-column prop="provinceWz" label="省份筛选" :filter-method="filterProveince" :filters="provinceFilter" :filter-multiple="false">
            </el-table-column>
            <el-table-column prop="role" label="角色筛选" :filter-method="filterRole" :filters="rolesFilter" :filter-multiple="false">
            </el-table-column>
            <el-table-column label="操作">
            </el-table-column>
        </el-table>
        <div class="pape">
            <el-pagination background layout="prev, pager, next" :total="total" @size-change="handleSizeChange" @current-change="handleSizeChange">
            </el-pagination>
        </div>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="user">
                <el-form-item label="项目" :label-width="formLabelWidth">
                    <el-select v-model="valuePlans" placeholder="请选择" @change="selectPlans($event)" value-key="id">
                        <el-option v-for="item in planLists" :key="item.name" :label="item.name" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="valueRoles" placeholder="请选择" @change="selectRoles($event)" value-key="id">
                        <el-option v-for="item in rolesList" :key="item.name" :label="item.name" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="省份" :label-width="formLabelWidth">
                    <el-select v-model="valueProvince" placeholder="请选择" :disabled="disabled" value-key="code">
                        <el-option v-for="item in province" :key="item.name" :label="item.name" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="user.name" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="user.tel" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addUser">确 定</el-button>
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
                provinceFilter: [],
                rolesFilter: [{
                    text: '省用户',
                    value: '省用户'
                }, {
                    text: '网评专家',
                    value: '网评专家'
                }, {
                    text: '实地专家',
                    value: '实地专家'
                }, {
                    text: '督导',
                    value: '督导'
                }],
                formLabelWidth: '100px',
                userList: [],
                planLists: [],
                rolesList: [],
                province: JSON.parse(window.localStorage.getItem("provinces")),
                valuePlans: {},
                valueRoles: {},
                valueProvince: {},
                disabled: true,
                total:0,
                user: {}
            }
        },
        // filters:{
        // },
        methods: {
            uniqArrar(arr) { //数组对象去重
                var result = []
                var number = []
                for (var i = 0; i < arr.length; i++) {
                    if (number.indexOf(arr[i].value == -1)) {
                        number.push(arr[i].value)
                        result.push(arr[i])
                    }
                }
                return result
            },
            filterRole(value, row) { //角色筛选
                // console.log(row)
                return row.role == value
            },
            filterProveince(value, row) { //省份筛选
                return row.provinceWz == value
            },
            getUserList() { //获取用户列表
                this.$ajax.get("/api/admin/users").then((res) => {
                    this.total = res.data.total
                    let data = res.data.data
                    let roles = ['省用户', '网评专家', '实地专家', '督导']
                    data.forEach((item, index, arr) => {
                        item.role = roles[item.role_id - 1]
                        for (var i = 0; i < this.province.length; i++) {
                            if (item.province == this.province[i].code) {
                                item.provinceWz = this.province[i].name
                            }
                            if (item.province == null) {
                                item.provinceWz = '未知'
                            }
                        }
                        let obj = {}
                        obj.text = item.provinceWz
                        obj.value = item.provinceWz
                        this.provinceFilter.push(obj)
                    })
                    this.userList = data
                }, (err) => {})
            },
            getYearPlans() { //获取年度计划列表
                this.$ajax.get("/api/admin/plans").then((res) => {
                    this.planLists = res.data.data.plans.filter((item) => {
                        return item.state == 'active'
                    })
                }, (err) => {
                    console.log()
                })
            },
            getRolesList(id) { //获取角色列表
                this.$ajax.get('/api/admin/roles').then((res) => {
                    this.rolesList = res.data.data
                    this.valueRoles = this.rolesList[0]
                    this.valueProvince = this.rolesList[0].province ? this.province[0] : {}
                    this.disabled = !this.rolesList[0].province
                }, (err) => {})
            },
            handleSizeChange(value){
                var param = {
                    page:value,
                    province:this.userList[0].province,
                    role_id:this.userList[0].role_id
                }
                this.$ajax.post("/api/admin/users/filter_user",param).then((res)=>{
                    this.userList = res.data.data
                },(err)=>{})
            },
            selectPlans(value) { //选择年度计划列表
                this.getRolesList(value.id)
            },
            selectRoles(value) {
                this.valueProvince = value.province ? this.province[0] : {}
                this.disabled = !value.province
            },
            addUser() { //添加用户
                var param = {
                    "name": this.user.name,
                    "mobile": this.user.tel,
                    "plan_id": this.valuePlans.id,
                    "role_id": this.valueRoles.id,
                    "province": this.valueProvince.code
                }
                this.$ajax.post("/api/admin/users", param).then((res) => {
                    console.log(res)
                }, (err) => {})
            }
        },
        mounted() {
            this.getUserList()
            this.getYearPlans()
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


