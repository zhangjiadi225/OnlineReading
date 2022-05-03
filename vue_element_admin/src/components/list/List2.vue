<template>
    <div class="list">
         <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>书架列表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入手机" v-model="searchQuery" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="用户手机" prop="tel"></el-table-column>
        <el-table-column align="center" label="标题" prop="title"></el-table-column>
        <el-table-column align="center" label="详情" prop="miaoshu"></el-table-column>
        <el-table-column align="center" label="类别">
    <template slot-scope="scope">
        <span v-if="scope.row.num==0">武打</span>
        <span v-if="scope.row.num==1">推理</span>
        <span v-if="scope.row.num==2">玄幻</span>
        <span v-if="scope.row.num==3">穿越</span>
        <span v-if="scope.row.num==4">仙侠</span>
        <span v-if="scope.row.num==5">言情</span>
        <span v-if="scope.row.num==6">其它</span>
        <span v-else>{{scope.row.key}}</span>
    </template>
</el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.shujia_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      searchQuery: '', // 搜索
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('getShujia')
      // if (res.meat.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.list
      console.log(res.list)
    },

    // 删除
    // 根据Id删除对应的用户信息
    async removeUserById(shujia_id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        '此操作将会将这本书从书架上删除, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.get('delShujia', { params: {
        shujia_id
      } })
      console.log(res.data)
      this.$message.success('删除用户成功！')
      this.getUserList()
    },

    // 搜索
    // 搜索
    async getUserSearch() {
      console.log(this.searchQuery,123132);
      let list = []
      for(let i = 0;i<this.userlist.length;i++){
        if( this.userlist[i].tel.includes(this.searchQuery)){
          list.push( this.userlist[i])
        }
      }
      this.userlist = list
    }
  }
}
</script>
<style lang="less" scoped>

</style>
