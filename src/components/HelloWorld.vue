<template>
  <div>
    <div class="btn-box">
      <a-button type="primary" @click="showDrawer()">新增</a-button>
      <a-button type="primary" @click="showModal()" style="margin-left: 20px">修改倒计时</a-button>
    </div>
    <a-table class="hello-table" :loading="tableLoading" :columns="columns" :data-source="data" bordered :pagination="pagination" @change="handleTableChange">
      <template slot="imgUrl" slot-scope="text, record">
        <a-tooltip placement="right" :overlayStyle="{'max-width': '400px'}">
          <template slot="title">
            <img :src="record.imgUrl" alt="" style="width: 100%">
          </template>
          <img :src="record.imgUrl" alt="" style="width: 60px; height: 60px">
        </a-tooltip>
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" @click="edit(record)">编辑</a-button>
        <a-popconfirm title="确定删除该条吗？" cancelText="取消" okText="确定" @confirm="del(record)">
          <a-button type="link" style="color: #ff4d4f">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
        :title="drawerTitle"
        placement="right"
        :closable="true"
        :visible="visible"
        @close="onClose"
        width="40%"
    >
      <a-form-model v-bind="layout">
        <a-form-model-item label="图片" prop="pass">
<!--          <a-upload-->
<!--              name="file"-->
<!--              :multiple="true"-->
<!--              :file-list="fileList"-->
<!--              :action="uploadUrl"-->
<!--              @change="handleChange"-->
<!--              :before-upload="uploadImg"-->
<!--              list-type="picture"-->
<!--              accept="image/*"-->
<!--          >-->
<!--            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>-->
<!--          </a-upload>-->
          <a-upload
              name="file"
              :multiple="true"
              :file-list="fileList"
              @change="uploadImg"
              list-type="picture"
              accept="image/*"
              :remove="remove"
          >
            <a-button> <a-icon type="upload" /> 点击上传图片 </a-button>
          </a-upload>
        </a-form-model-item>
        <a-form-model-item label="标语" prop="checkPass">
          <a-input v-model="title" type="text" autocomplete="off" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="submitForm()" :loading="btnLoading">
            提交
          </a-button>
<!--          <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">-->
<!--            重置-->
<!--          </a-button>-->
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
    <a-modal
        title="请选择倒计时时间"
        :visible="modalVisible"
        @cancel="handleCancel"

    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
      <a-date-picker
          v-model="dateTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="false"
          :showToday="false"
          @change="changeDate"
          :allowClear="false"
      />
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment';

import lrz from 'lrz'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: '15%',
  },
  {
    title: '图片',
    dataIndex: 'imgUrl',
    width: '25%',
    scopedSlots: { customRender: 'imgUrl' },
  },
  {
    title: '标语',
    dataIndex: 'title',
    width: '40%',
    scopedSlots: { customRender: 'title' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: 'HelloWorld',
  data(){
    return {
      moment,
      ruleForm: {
        imageUrl: '',
        title: '',
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      columns,
      uploadUrl: `${process.env.VUE_APP_BASE_CODE_URL}/imgUpload/upload`,
      data: [],
      visible: false,
      drawerTitle: "新增",
      fileList: [],
      title: "",
      url: "",
      type: 'add',
      pagination: { current: 1, pageSize: 10},
      btnLoading: false,
      tableLoading: false,
      selectRowId: "",
      modalVisible: false,
      loading: false,
      dateTime: moment('2012-01-01 12:22:22', "YYYY-MM-DD")
    }
  },
  mounted() {
    this.fetch()
    this.fetchTime()
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = {...this.pagination};
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch(){
      this.tableLoading = true
      let data = {
        page: this.pagination.current
      }
      this.$api.getList(data).then((res) => {
        this.tableLoading = false
        if(res.code === 200){
          const pagination = {...this.pagination};
          pagination.total = res.data.total
          this.pagination = pagination
          this.data = res.data.result
          this.data.map((item) => {
            item.key = item.id
          })
        } else {
          this.$message.error('获取列表失败')
        }
      })
    },
    fetchTime(){
      this.tableLoading = true
      this.$api.getTime().then((res) => {
        this.tableLoading = false
        if(res.code === 200){
          console.log(res)
          this.dateTime = res.msg[0].time
        } else {
          this.$message.error('获取时间失败')
        }
      })
    },
    del(item){
      this.tableLoading = true
      let data = {
        id: item.id
      }
      this.$api.delList(data).then((res) => {
        this.tableLoading = false
        if(res.code == 200){
          this.$message.success("删除成功")
          this.fetch()
        }else{
          this.$message.error("删除失败，请联系管理员")
        }
      })
    },
    edit(item){
      this.selectRowId = item.id
      this.visible = true
      this.type = 'edit'
      this.drawerTitle = '条目修改'
      this.url = item.imgUrl
      this.title = item.title
      let name = item.imgUrl.split("/")
      this.fileList = [
        {
          uid: '-1',
          name: name[name.length -1],
          status: 'done',
          url: item.imgUrl,
          thumbUrl: item.imgUrl,
        },
      ]
    },
    onClose(){
      this.visible = false
    },
    showDrawer(){
      this.visible = true
      this.type = 'add'
      this.drawerTitle = '条目新增'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(){
      // if(!this.url){
      //   this.$message.error("请上传图片")
      //   return
      // }
      if(this.type === 'add'){
        this.addList()
      } else if(this.type === 'edit'){
        this.editList()
      }
    },
    addList(){
      if(!this.url){
        this.$message.error("请上传图片")
        return
      }
      this.btnLoading = true
      let data = {
        imgUrl: this.url,
        title: this.title
      }
      this.$api.addList(data).then((res) => {
        this.btnLoading = false
        if(res.code == 200){
          this.$message.success("新增成功")
          this.fetch()
          this.visible = false
          this.title = ""
          this.url = ""
          this.fileList = []
        }else{
          this.$message.error("新增失败，请联系管理员")
        }
      })
    },
    editList(){
      this.btnLoading = true
      let data = {
        id: this.selectRowId,
        imgUrl: this.url,
        title: this.title
      }
      this.$api.editList(data).then((res) => {
        this.btnLoading = false
        if(res.code == 200){
          this.$message.success("修改成功")
          this.fetch()
          this.visible = false
          this.title = ""
          this.url = ""
          this.fileList = []
        }else{
          this.$message.error("修改失败，请联系管理员")
        }
      })
    },
    uploadImg(info){
      let that = this
      lrz( info.file.originFileObj, {
        // width : 300,
        quality: 0.7    //自定义使用压缩方式
      })
          .then(function(rst) {
            that.$api.uploadImg(rst.formData).then((res) => {
              if(res.code === 200){
                // Component will show file.url as link
                that.$message.success('图片上传成功')
                that.url = 'http://42.192.68.235/files/' + res.data;
                that.fileList = [{
                  uid: '-1',
                  name: res.data,
                  status: 'done',
                  url: that.url,
                  thumbUrl: that.url,
                },]
              } else{
                that.$message.error('图片上传失败，请联系管理员')
              }
            })
            //成功时执行
          }).catch(function() {
        that.$message.error('上传错误')
        //失败时执行
      }).always(function() {
        //不管成功或失败，都会执行
      })
    },
    remove(){
      this.fileList = []
      this.url = ''
    },
    showModal(){
      this.modalVisible = true
    },
    handleCancel(){
      this.modalVisible = false
    },
    handleOk(){
      this.loading = true
      let data = {
        id: 1,
        time: this.dateTime
      }
      this.$api.editTime(data).then((res) => {
        console.log(res)
        if(res.code === 200){
          this.$message.success("时间修改成功")
          this.modalVisible = false
          this.loading = false
        } else {
          this.$message.error("时间修改失败")
          this.loading = false
        }
      })
    },
    changeDate(e){
      this.dateTime = moment(e).format('YYYY-MM-DD HH:mm:ss')
    }
    // handleChange(info) {
    //   console.log(info)
    //   lrz( info.file.originFileObj, {
    //     // width : 300,
    //     quality: 0.7    //自定义使用压缩方式
    //   })
    //       .then(function(rst) {
    //         console.log(rst)
    //         //成功时执行
    //       }).catch(function(error) {
    //         console.log(error)
    //     //失败时执行
    //   }).always(function() {
    //     console.log(4354656)
    //     //不管成功或失败，都会执行
    //   })
    //   let fileList = [...info.fileList];
    //   // 1. Limit the number of uploaded files
    //   //    Only to show two recent uploaded files, and old ones will be replaced by the new
    //   fileList = fileList.slice(-1);
    //   // 2. read from response and show file link
    //   fileList = fileList.map(file => {
    //     if (file.response) {
    //       if(file.response.code == 200){
    //         // Component will show file.url as link
    //         this.$message.success('图片上传成功')
    //         this.url = 'http://42.192.68.235/files/' + file.response.data;
    //       } else{
    //         this.$message.error('图片上传失败，请联系管理员')
    //       }
    //     }
    //     return file;
    //   });
    //   this.fileList = fileList;
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-box{
  margin-bottom: 24px;
}
.hello-table{
  height: calc(100vh - 210px);
  overflow-y: auto;
}
</style>
<style>
.ant-tooltip-inner {
  background-color: #fff;
}
</style>
