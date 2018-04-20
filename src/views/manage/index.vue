<template>
    <div class="wrapper">
        <div class="table-list">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                prop="date"
                label="测评点"
                width="700">
                </el-table-column>
                <el-table-column
                prop="name"
                label="网评专家"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="操作">
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align:center;margin-top:30px">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="1">
            </el-pagination>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
        this.getPointList();

    },
    methods:{
        getPointList(){
               this.$ajax.get('/api/admin/assessments',{}).then((res) => {
                    var data = []
                    console.log(res)
                    for (var i = 0; i < res.data.length; i++) {
                        var obj = {}
                        obj.date = res.data[i].content
                        obj.name = res.data[i].children_count
                        obj.address = '详情'
                        data[i] = obj
                    }
                    this.tableData = data
                    console.log(this.tableData);
                },(err)=>{})
        }
    }
  }
</script>
<style>

</style>

