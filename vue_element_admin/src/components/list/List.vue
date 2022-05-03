<template>
  <div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入标题" v-model="searchQuery" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserSearch"></el-button>
          </el-input>
        </el-col>
        <!-- <el-button @click="newBook">上传小说</el-button>
        <input ref="input" type="file" name="zz" @input="upload" style="position: absolute; top: -11000px;" /> -->
        <!-- <el-upload
          class="upload-demo"
          action="http://127.0.0.1:5000/getfile"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          multiple
          :file-list="fileList"
        > -->
          <el-button @click="pachong" size="small" type="primary">爬取图书</el-button>
          <el-button @click="getNeed" size="small" type="primary">查看需求</el-button>
        <!-- </el-upload> -->
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="标题" prop="title"></el-table-column>
        <el-table-column align="center" label="详情" prop="miaoshu"></el-table-column>
        <el-table-column align="center" label="类别">
          <template slot-scope="scope">
            <span v-if="scope.row.num == 0">武打</span>
            <span v-if="scope.row.num == 1">推理</span>
            <span v-if="scope.row.num == 2">玄幻</span>
            <span v-if="scope.row.num == 3">穿越</span>
            <span v-if="scope.row.num == 4">仙侠</span>
            <span v-if="scope.row.num == 5">言情</span>
            <span v-if="scope.row.num == 6">其它</span>
            <span v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.book_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改 -->
    <el-dialog title="修改填报信息" :visible.sync="editDialogVisible" width="66%" @close="editDialogClosed">
      <el-form :model="editForm" ref="editFormRef" label-width="90px">
        <el-form-item label="标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="editForm.miaoshu"></el-input>
        </el-form-item>
        <el-form-item label="上架时间">
          <el-input v-model="editForm.shijian"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userlist: [],
      searchQuery: '', // 搜索
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: []
    }
  },
  created () {
    this.getUserList()
    console.log(this.filecontent, '123213')
  },
  methods: {
    pachong(){
        this.$http.post('change',{
        data: {
          name:'zz'
        }
      })
      this.$message('爬取图书中,时间很长');
    },

    // newBook () {
    //   this.$refs.input.click()
    // },
    // upload () {
    //   let files = this.$refs.input.files[0]
    //   // console.log(files) //文件对象到手
    //   let reader = new FileReader()
    //   reader.readAsText(files, 'UTF-8')
    //   // reader.onload = function (e) {
    //   //   var content = e.target.result.trim()
    //   //   let res
    //   //   for(let i = 0; i<8;i++){
    //   //     res += content.split(' ')[i]
    //   //   }
    //   //   // console.log(res)
    //   //   this.files = res.split('\n').filter(item => item !== '')
    //   //   console.log('获取到文件')
    //   //   console.log('files改变',this.files);
    //   // }
    // },
    // async addnew(){
    //     const { data: res1 }  =  await this.$http.post('addBook', {
    //       data: {
    //         msg: this.filecontent.msg,
    //         title: this.filecontent.title,
    //         shijian: this.filecontent.shijian,
    //         miaoshu: this.filecontent.miaoshu,
    //         num: this.filecontent.num,
    //         img: this.filecontent.img
    //       }
    //     })
    //     // console.log(res1);
    // },
    async getUserList () {
      const { data: res } = await this.$http.get('getBooks')
      // if (res.meat.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.list
      console.log(res.list)
    },
    // 关闭修改对话框
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 修改
    showEditDialog (obj) {
      console.log(obj)
      this.editForm = obj
      this.editDialogVisible = true
    },
    // 删除
    // 根据Id删除对应的用户信息
    async removeUserById (book_id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将会删除这本书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.get('delBook', {
        params: {
          book_id
        }
      })
      console.log(res.data)
      this.$message.success('删除用户成功！')
      this.getUserList()
    },

    // 确认修改
    async editUserInfo () {
      const { data: res } = await this.$http.get('updateBook', {
        params: {
          title: this.editForm.title,
          shijian: this.editForm.shijian,
          miaoshu: this.editForm.miaoshu,
          book_id: this.editForm.book_id
        }
      })
      console.log(res)
      // 关闭对话框
      this.editDialogVisible = false
      this.$message.success('修改成功！')
      this.getUserList()
    },

    // 搜索
    // 搜索
    async getUserSearch () {
      console.log(this.userlist, 213213)
      let list = []
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].title.includes(this.searchQuery)) {
          list.push(this.userlist[i])
        }
      }
      this.userlist = list
    },
     async getNeed () {
      console.log(this.userlist, 213213)
      let list = []
      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i].title.includes('**')) {
          list.push(this.userlist[i])
        }
      }
      this.userlist = list
    }
  }
}
</script>
<style lang="less" scoped></style>
