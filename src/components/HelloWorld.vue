<template>
  <div>
    <div class="btn-box">
      <a-button type="primary" @click="showDrawer()">新增</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" @click="edit(record)">编辑</a-button>
        <a-popconfirm title="确定删除该条吗？" cancelText="取消" okText="确定" @confirm="del(record)">
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
        :title="drawerTitle"
        placement="right"
        :closable="true"
        :visible="visible"
        @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
const columns = [
  {
    title: '图片',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '标题',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'title' },
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
export default {
  name: 'HelloWorld',
  data(){
    return {
      columns,
      data,
      visible: false,
      drawerTitle: "新增"
    }
  },
  mounted() {

  },
  methods: {
    fetch(){
      let data = {
        uid: 1,
        name: 'aaa'
      }
      this.$api.getAdminList(data).then((res) => {
        console.log(res)
      })
    },
    del(item){
      console.log(item.name)
    },
    edit(item){
      this.visible = true
      this.drawerTitle = '条目修改'
      console.log(item.name)
    },
    onClose(){
      this.visible = false
    },
    showDrawer(){
      this.visible = true
      this.drawerTitle = '条目新增'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-box{
  margin-bottom: 24px;
}
</style>
