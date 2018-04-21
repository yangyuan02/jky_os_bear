<template>
    <div class="wrapper">
        <h3 class="detail-title">评测点列表</h3>
        <div class="table-list">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                @row-click="getPointDetail">
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
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getPointDetail">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="text-align:center;margin-top:30px">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @size-change="changePage"
            @current-change="changePage">
            </el-pagination>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        total:1
      }
    },
    mounted(){
        this.getPointList(1);

    },
    methods:{
        getPointList(num){
            console.log(num)
               this.$ajax.get('/api/admin/assessments?page='+num,{}).then((res) => {
                    var data = []
                    console.log(res,res.data,res.data.total)
                    this.total =res.data.total;
                    for (var i = 0; i < res.data.data.length; i++) {
                        var obj = {}
                        obj.date = res.data.data[i].content
                        obj.name = res.data.data[i].children_count
                        obj.id = res.data.data[i].id
                        data[i] = obj
                    }
                    this.tableData = data
                },(err)=>{})
        },
        changePage(num){
            console.log(222)
            this.getPointList(num)

        },
        getPointDetail(row){
            // this.$router.push('./pointDetail')
            this.$router.push({ name: 'pointDetail', params: { pointId: row.id}})
        }
    }
  }
</script>
<style scoped lang="less">
    .wrapper{
        .detail-title {
            font-size: 16px;
            margin-bottom: 20px;
        }
    }
</style>

