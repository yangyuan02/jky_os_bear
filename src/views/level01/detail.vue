<template>
    <div class="wrapper">
        <h3 class="detail-title">设计工作详情</h3>
        <div class="content on-plan">
            <p class="title">角色</p>
            <ul class="on-plan-list">
                <li @click="dialogFormVisible = true">
                    <i class="el-icon-plus"></i>
                </li>
                <li class="on-li">
                    <p class="plan-name m15">网评专家用户</p>
                    <p class=" m15">
                        <p class="roles">
                            <span class="roles-left">工作时段：</span>
                            <span class="roles-right">2018.6.1-6.30</span>
                        </p>
                        <p class="roles">
                            <span class="roles-left">成员人数：</span>
                            <span class="roles-right">10</span>
                        </p>
                    </p>
                    <p class="plan-button m15">
                        <span class="add-btn">
                    <i class="el-icon-circle-plus-outline"></i>
                    添加成员
                  </span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="content finished-plan">
            <p class="title">实地专家组</p>
            <ul class="on-plan-list finished-plan-list">
                <li class="on-li">
                    <p class="plan-name m15">北京市</p>
                    <p class=" m15">
                        <p class="roles">
                            <span class="roles-left">工作时段：</span>
                            <span class="roles-right">2018.6.1-6.30</span>
                        </p>
                        <p class="roles">
                            <span class="roles-left">成员人数：</span>
                            <span class="roles-right">10</span>
                        </p>
                    </p>
                    <p class="roles">
                        <!-- <span class="roles-left">组长：</span>
                    <span class="roles-right">任丽丽</span> -->
                    </p>
                    <p class="plan-button m15">
                        <span class="add-btn">
                    <i class="el-icon-setting"></i>
                    组长设置
                  </span>
                    </p>
                </li>
                <li class="on-li">
                    <p class="plan-name m15">上海市</p>
                    <p class=" m15">
                        <p class="roles">
                            <span class="roles-left">工作时段：</span>
                            <span class="roles-right">2018.6.1-6.30</span>
                        </p>
                        <p class="roles">
                            <span class="roles-left">成员人数：</span>
                            <span class="roles-right">10</span>
                        </p>
                        <p class="roles">
                            <span class="roles-left">组长：</span>
                            <span class="roles-right">任丽丽</span>
                        </p>
                    </p>
                    <p class="plan-button m15">
                        <span class="add-btn">
                    <i class="el-icon-setting"></i>
                    组长设置
                  </span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- Form -->
        <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
        <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                formLabelWidth: '60px'
            };
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    @main-clolr: #409EFF;
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
            margin-left: -20px; // margin-right: -2px;
            padding: 0 20px 20px 20px;
        }
        .finished-plan {
            margin-top: 20px;
        }
    }
</style>


