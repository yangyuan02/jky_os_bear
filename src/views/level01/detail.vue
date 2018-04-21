<template>
  <div class="wrapper">
    <h3 class="detail-title">{{$route.params.planName}}详情</h3>
    <div class="content on-plan">
      <p class="title">角色</p>
      <ul class="on-plan-list">
        <li @click="addroles_show">
          <i class="el-icon-plus"></i>
        </li>
        <li class="on-li" v-for="(role,index) in roles">
            <p class="plan-name m15">{{role.name}}</p>
            <div class=" m15">
              <p class="roles">
                <span class="roles-left">工作时段：</span>
                <span class="roles-right">{{role.begin_at.slice(0,10).replace(/-/ig,'.')}}-{{role.end_at.slice(6,10).replace(/-/ig,'.')}}</span>
              </p>
              <p class="roles">
                <span class="roles-left">成员人数：</span>
                <span class="roles-right">{{role.users_count}}</span>
              </p>
            </div>
            <p class="plan-button m15">
              <span class="add-btn" @click="addusers_show(index)">
                <i class="el-icon-circle-plus-outline"></i>
                添加成员
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
        <el-button type="primary" @click="addroles">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="30%">
       <el-form :model="form1">
        <el-form-item label="项  目：" :label-width="formLabelWidth">
          <a>{{$route.params.planName}}</a>
        </el-form-item>
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
export default {
  data() {
    return {
      value:"",
      value6: "",
      checked:false,
      roles:[],
      areas:[],
      areas_show:false,
      tab_user:"",
      role_id:"",
      addVisible: false,
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
      form1: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        phone:"",
      },
      formLabelWidth: "60px",
      expertList:[],
    };
  },
  mounted () {
    this.provinces()
    this.roleslist()
    this.getExpertList()
    this.provinces();
  },
  methods: {
    addroles_show:function(){
      this.dialogFormVisible = true
      this.form.name=""
      this.value6=""
      this.checked=false
    },
    addroles:function(){//添加角色
    this.dialogFormVisible = false
     console.log(this.form.name)
     console.log(this.value6[0])
     console.log(this.$route.params.planId)
     console.log(this.checked)
      this.$ajax.post("/api/admin/roles",{"name":this.form.name, "plan_id":this.$route.params.planId,"province":this.checked,
      "begin_at":this.value6[0],"end_at":this.value6[1],})
           .then((res) => {
                    this.roleslist()
                },(err)=>{})
     },
     roleslist:function(){//获取角色列表
      this.$ajax.get('/api/admin/roles?plan_id='+this.$route.params.planId+'',{})
           .then((res) => {
                    this.roles=res.data.data
                    console.log(res)
                },(err)=>{})
     },
     getExpertList:function(){
         this.$ajax.get("/api/admin/teams?plan_id="+this.$route.params.planId).then((res) => {
            console.log(res)
            var allExpert =res.data;
            // this.expertList = res.data;
            console.log(this.areas)
            for (var i = 0; i < allExpert.length; i++) {
                for (var j = 0; j < this.areas.length; j++) {
                    if(allExpert[i].province == this.areas[j].code){
                        allExpert[i].name=this.areas[j].name;
                    }
                }
            }
            this.expertList = allExpert
        }, (err) => {})

     },

     provinces:function(){
       this.$ajax.get("/api/provinces",{})
           .then((res) => {
                  this.areas=res.data
                    console.log(this.areas)
                },(err)=>{})
     },
     addusers:function(){//添加用户
     this.addVisible = false
     console.log(this.form1.phone)
     console.log(this.form1.name)
     console.log(this.value)
         this.$ajax.post("/api/admin/users",{"name":this.form1.name,"mobile":this.form1.phone,"plan_id":this.$route.params.planId,"province":this.value,"role_id":this.role_id,})
           .then((res) => {
                  this.addVisible = false
                  this.areas=res.data
                  this.roleslist()
                },(err)=>{})
     },
     addusers_show:function(e){//添加用户显示
     this.addVisible = true
     this.tab_user=this.roles[e].name
     this.role_id=this.roles[e].id
     this.areas_show=this.roles[e].province
     this.form1.phone=""
     this.form1.name=""
     this.value=""
     console.log(e)

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
            padding-right:30px;
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
  .check_a{
    display:inline-block;
    min-width: 106px;
  }
}
</style>

