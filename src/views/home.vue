<template>
    <div class="wrapper">
        <el-container>
            <el-header>
                <v-head></v-head>
            </el-header>
            <el-container>
                <el-aside style="width:200px;">
                    <v-sidebar></v-sidebar>
                </el-aside>
                <el-main>
                    <transition name="move" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import vHead from '@/components/common/Header';
    import vSidebar from '@/components/common/Sidebar';
    export default {
        data() {
            return {
                province: []
            }
        },
        components: {
            vHead,
            vSidebar
        },
        methods:{
            getProvince(){//获取省份
                this.$ajax.get("/api/provinces").then((res)=>{
                    window.localStorage.setItem("provinces",JSON.stringify(res.data))
                },(err)=>{

                })
            }
        },
        mounted(){
            this.getProvince()
        }
    }
</script>

<style scoped lang="less">
    .wrapper {
        height: 100%;
        .el-container {
            height: 100%;
            .el-header {
                background: #409EFF;
            }
            .el-container {
                height: 100%;
                .el-aside {
                    height: 100%;
                }
                .el-main {
                    width: calc(100% - 200px);
                    height: 100%;
                    background: #fff;
                }
            }
        }
    }
</style>

