<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/system/role' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建角色</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="form" :model="roleForm" :rules="rules" ref="roleForm">
      <el-form-item label="角色中文名称" label-width="120px" prop="name">
        <el-input v-model="roleForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色英文名称" label-width="120px" prop="nameCode">
        <el-input v-model="roleForm.nameCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px" prop="describe">
        <el-input v-model="roleForm.describe" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否可查看手机号" prop="ifLookMobile">
        <el-radio v-model="roleForm.ifLookMobile" label="1">是</el-radio>
        <el-radio v-model="roleForm.ifLookMobile" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="页面权限设置" label-width="120px">
        <el-tree
          ref="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1,2]"
          :props="defaultProps">
        </el-tree>
      </el-form-item>
      <el-form-item label-width="120px">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit('roleForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {addRoleList, submitRole, editRole} from '@/services/AppServiceRequest';
  import { lengthVal } from '@/utils/validate.js';

  export default {
    data () {
      return {
        roleForm: {
          id: '',
          name: '',
          nameCode: '',
          describe: '',
          menuIds: [],
          ifLookMobile: ''
        },
        rules: {
          name: [
            {validator: lengthVal, trigger: 'blur'}
          ],
          nameCode: [
            {validator: lengthVal, trigger: 'blur'}
          ],
          describe: [
            {validator: lengthVal, trigger: 'blur'}
          ],
          ifLookMobile: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        menuList: [],
        defaultProps: {
          children: 'childList',
          label: 'name'
        },
        editId: this.$route.params.id
      };
    },
    mounted () {
      if (this.editId) {
        this.editInit();
      } else {
        this.addInit();
      }
    },
    methods: {
      addInit () {
        addRoleList().then(res => {
          if (res.code === 0) {
            this.menuList = res.data.menu.childList;
          }
        });
      },
      editInit () {
        editRole({id: this.editId}).then(res => {
          if (res.code === 0) {
            this.roleForm.ifLookMobile = res.data.role.ifLookMobile + '';
            this.menuList = res.data.menu.childList;
            this.roleForm.name = res.data.role.name;
            this.roleForm.nameCode = res.data.role.nameCode;
            this.roleForm.describe = res.data.role.describe;
            this.roleForm.id = res.data.role.id;
            this.roleForm.menuIds = res.data.role.menuIds.split(',');
            // this.roleForm.ifLookMobile = res.data.role.ifLookMobile + '';
            this.$refs.tree.setCheckedKeys(this.roleForm.menuIds);
          }
        });
      },
      submit (formName) {
        this.roleForm.menuIds = this.$refs.tree.getCheckedKeys();
        this.roleForm.menuIds = this.roleForm.menuIds.join(',');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            submitRole(this.roleForm).then(res => {
              if (!res) return;
              if (res.code === 0) {
                this.$message.success('提交成功！');
                this.$router.back(-1);
              }
            });
          }
        });
      },
      cancel () {
        this.$router.back(-1);
      }
    }
  };
</script>
<style scoped>
  .form {
    margin-top: 40px;
    width:50%
  }
</style>
