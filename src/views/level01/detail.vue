<template>
  <div class="wrapper">
    <h3 class="detail-title">角色详情</h3>
    <div class="content on-plan">
      <ul class="on-plan-list">
        <!-- <li @click="addroles_show">
          <i class="el-icon-plus"></i>
        </li> -->
        <li class="on-li" v-for="(role,index) in roles">
            <p class="plan-name m15">{{role.name}}</p>
            <div class=" m15">
              <p class="roles">
                <span class="roles-left">工作时段：</span>
                <span class="roles-right">{{role.begin_at==null?0:role.begin_at.slice(0,10).replace(/-/ig,'.')}}-{{role.end_at==null?0:role.end_at.slice(6,10).replace(/-/ig,'.')}}</span>
              
              </p>
              <p class="roles">
                <span class="roles-left">成员人数：</span>
                <span class="roles-right">{{role.users_count==null?0:role.users_count}}</span>
              </p>
            </div>
            <p class="plan-button m15">
              <span class="add-btn" @click="addusers_show(index)">
                <i class="el-icon-circle-plus-outline"></i>
                添加成员
              </span>
              <span class="add-btn" @click="change_show(index)">
                <i class="el-icon-edit"></i>
                修改
              </span>
            </p>
        </li>

      </ul>
    </div>
    <!-- Form -->
<!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <div class="add_name">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        </div>
         <el-form-item label="时间" :label-width="formLabelWidth" label-padding="0px 20px 0px 0px">
        <el-date-picker v-model="value6" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width:80%;">
       </el-date-picker>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-checkbox v-model="checked" style="width:50%;float:left;text-align: left;margin-left: 5%;">是否与省份关联</el-checkbox>
        <el-button type="primary" @click="change_users">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改 -->
    <el-dialog title="修改" :visible.sync="changeVisible" width="30%">
      <el-form :model="form_change">
        <div class="add_name">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <a>{{tab_user}}</a>
          <!-- <el-input v-model="form_change.name" auto-complete="off" placeholder="请输入内容"></el-input> -->
        </el-form-item>
        </div>
         <el-form-item label="时间" :label-width="formLabelWidth" label-padding="0px 20px 0px 0px">
        <el-date-picker v-model="value_change" type="daterange"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width:80%;">
       </el-date-picker>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <!-- <el-checkbox v-model="change_checked" style="width:50%;float:left;text-align: left;margin-left: 5%;">是否与省份关联</el-checkbox> -->
        <el-button type="primary" @click="change_users">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
       <el-form :model="form1">
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <a>{{tab_user}}</a>
        </el-form-item>
        <el-form-item label="省份：" :label-width="formLabelWidth" v-show="areas_show">
        <el-select v-model="value" placeholder="请选择">
         <el-option
         v-for="area in areas"
          :key="area.code"
         :label="area.name"
          :value="area.code">
          </el-option>
        </el-select>
        </el-form-item>
       <el-form-item label="姓名:" label-width="50px">
           <el-input v-model="form1.name" auto-complete="off" placeholder="请输入内容" style="width:50%;margin-left:10px"></el-input>
       </el-form-item>
      <el-form-item label="手机号:" :label-width="formLabelWidth">
          <el-input v-model="form1.phone" auto-complete="off" placeholder="请输入内容" style="width:50%;"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addusers">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import validate from "@/widget/validate"
export default {
  data() {
    return {
      value: "",
      value6: "",
      value_change: [],
      checked: false,
      change_checked: false,
      roles: [],
      areas: JSON.parse(window.localStorage.getItem("provinces")),
      areas_show: false,
      tab_user: "",
      role_id: "",
      addVisible: false,
      changeVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form_change: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      form1: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        phone: ""
      },
      formLabelWidth: "60px",
      expertList: []
    };
  },
  mounted() {
    this.roleslist();
  },
  methods: {
    addroles_show: function() {
      this.dialogFormVisible = true;
      this.form.name = "";
      this.value6 = "";
      this.checked = false;
    },
    addroles: function() {
      //添加角色
      this.dialogFormVisible = false;
      console.log(this.form.name);
      console.log(this.value6[0]);
      console.log(this.$route.params.planId);
      console.log(this.checked);
      this.$ajax
        .post("/api/admin/roles", {
          name: this.form.name,
          province: this.checked,
          begin_at: this.value6[0],
          end_at: this.value6[1]
        })
        .then(
          res => {
            this.roleslist();
          },
          err => {}
        );
    },
    roleslist: function() {
      //获取角色列表
      this.$ajax.get("/api/admin/roles", {}).then(
        res => {
          this.roles = res.data.data;
          console.log(this.roles);
        },
        err => {}
      );
    },
    //  provinces:function(){
    //    this.$ajax.get("/api/provinces",{})
    //        .then((res) => {
    //               this.areas=res.data
    //                 console.log(this.areas)
    //             },(err)=>{})
    //  },
    addusers: function() {
      //添加用户
      if(this.areas_show){
       if (this.value == "" || this.value == undefined) {
        this.$message.error("省份不能为空");
        return;
      }
      }
      if (this.form1.name == "" || this.form1.name == undefined) {
        this.$message.error("用户名不能为空");
        return;
      }
      if (this.form1.phone == "" || this.form1.phone == undefined) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!validate.isMobile(this.form1.phone)) {
        this.$message.error("手机号格式错误");
        return;
      }
      this.addVisible = false;
      console.log(this.form1.phone);
      console.log(this.form1.name);
      console.log(this.value);
      this.$ajax
        .post("/api/admin/users", {
          name: this.form1.name,
          mobile: this.form1.phone,
          province: this.value,
          role_id: this.role_id
        })
        .then(
          res => {
            this.addVisible = false;
            this.roleslist();
          },
          err => {}
        );
    },
    change_show: function(e) {
      this.changeVisible = true;
      this.form_change.name = "";
      this.value_change = "";
      this.change_checked = false;
      this.tab_user = this.roles[e].name;
      this.role_id = this.roles[e].id;
      console.log(this.roles[e].begin_at);
      this.value_change = this.roles[e].begin_at;
      // this.value_change.push(this.roles[e].end_at)
    },
    change_users: function() {
      //修改
      this.changeVisible = false;
      console.log(this.value_change[0]);
      this.$ajax
        .patch("/api/admin/roles/" + this.role_id + "", {
          end_at: this.value_change[1],
          begin_at: this.value_change[0]
        })
        .then(
          res => {
            this.changeVisible = false;
            this.roleslist();
          },
          err => {}
        );
    },
    addusers_show: function(e) {
      //添加用户显示
      this.addVisible = true;
      this.tab_user = this.roles[e].name;
      this.role_id = this.roles[e].id;
      this.areas_show = this.roles[e].province;
      this.form1.phone = "";
      this.form1.name = "";
      this.value = "";
      console.log(e);
    }
  }
};
</script>

<style lang="less"  scoped>
@main-clolr: #409eff;
@text-color: #909399;
.wrapper {
  .detail-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
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
        width: 228px;
        height: 178px;
        border: 1px dotted #dcdfe6;
        border-radius: 5px;
        text-align: center;
        line-height: 180px;
        font-size: 14px;
        padding: 0 15px;
        margin-right: 22px;
        margin-bottom: 22px;
        cursor: pointer;
      }
      .on-li {
        position: relative;
        border-color: @main-clolr;
        border-style: solid;
        line-height: 24px;
        text-align: left;
        p {
          line-height: 24px;
        }
        .m15 {
          margin-top: 15px;
        }
        .plan-name {
          font-size: 16px;
          color: @main-clolr;
        }
        .roles {
          color: @text-color;
          .roles-left {
            padding-right: 30px;
          }
        }
        .plan-button {
          position: absolute;
          left: 15px;
          bottom: 20px;
          .add-btn {
            color: #ffbd3d;
            padding-right: 20px;
          }
        }
      }
    }
  }
  .on-plan {
    border-bottom: 1px solid #e6e6e6;
    margin-left: -20px;
    // margin-right: -2px;
    padding: 0 20px 20px 20px;
  }
  .finished-plan {
    margin-top: 20px;
  }
  .check_a {
    display: inline-block;
    min-width: 106px;
  }
}
</style>

