<template>
    <div class="wrapper">
        <h3 class="detail-title">实地专家组详情</h3>
        <div class="content finished-plan">
            <ul class="on-plan-list finished-plan-list">
                <li class="on-li" v-for="(expert,index) in expertList" :key="index">
                <p class="plan-name m15">{{expert.name}}</p>
                    <p class=" m15">
                    <p class="roles">
                        <span class="roles-left">工作时段：</span>
                        <span class="roles-right">{{expert.created_at.slice(0,10).replace(/-/ig,'.')}}-{{expert.updated_at.slice(6,10).replace(/-/ig,'.')}}</span>
                    </p>
                    <p class="roles">
                        <span class="roles-left">成员人数：</span>
                        <span class="roles-right">0</span>
                    </p>
                    <p class="roles">
                        <span class="roles-left">组长：</span>
                        <span class="roles-right">无</span>
                    </p>
                    </p>
                    <p class="plan-button m15">
                    <span class="add-btn" @click="setting(expert.province)">
                        <i class="el-icon-setting"></i>
                        组长设置
                    </span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- 组长设置      -->
        <el-dialog title="组长设置" :visible.sync="setVisible" width="25%">
            <el-checkbox-group
        v-model="checkedname"
        :min="0"
        :max="1">
        <a class="check_a" v-for="name in names"><el-checkbox  :label="name" :key="name">{{name}}</el-checkbox></a>
    </el-checkbox-group>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setVisible = false">确 定</el-button>
        </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
        province: JSON.parse(window.localStorage.getItem("provinces")),
        planId:JSON.parse(window.localStorage.getItem("plan")),
        setVisible:false,
        form1: {
            name: "",
        },
        checkedname:[],
        names:[],
        formLabelWidth: "60px",
        expertList:[],
    };
  },
  mounted () {
    this.getExpertList()
  },
  methods: {
     getExpertList:function(){
         this.$ajax.get("/api/admin/teams?plan_id="+this.planId).then((res) => {
            var allExpert =res.data;
            for (var i = 0; i < allExpert.length; i++) {
                for (var j = 0; j < this.province.length; j++) {
                    if(allExpert[i].province == this.province[j].code){
                        allExpert[i].name=this.province[j].name;
                    }
                }
            }
            this.expertList = allExpert
        }, (err) => {})

     },
     setting:function(e){
      this.setVisible = true
      this.names=[]
      this.$ajax.post("/api/admin/users/shidi_expert_user",{"province":e,}).then((res) => {
        for(var i=0;i<res.data.data.length;i++){
          this.names.push(res.data.data[i].name)
        }         
        }, (err) => {})
     },
  }
};
</script>
<style scoped lang="less">
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
    .finished-plan-list {
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
  .check_a{
    display:inline-block;
    min-width: 106px;
  }
}
</style>

