<template>
  <el-form :model="ruleForm" label-width="80px">
    <el-row type="flex"  justify="center" >
      <el-col :span="14">
        <el-form-item label="ID">
          <el-input disabled v-model="ruleForm.id" placeholder="ID"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="服务ID">
          <el-input disabled v-model="ruleForm.serviceId" placeholder="服务ID"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="路径">
          <el-input v-model="ruleForm.path" placeholder="路径"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="URL">
          <el-input v-model="ruleForm.url" placeholder="URL"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="是否重试">
          <el-radio-group v-model="ruleForm.retryable">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="是否过滤前缀">
          <el-radio-group v-model="ruleForm.stripPrefix">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="是否有效">
          <el-radio-group v-model="ruleForm.enabled">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="接口名称">
          <el-input v-model="ruleForm.apiName" placeholder="接口名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-button type="primary" @click="saveInfo">保 存</el-button>
    </el-row>
  </el-form>
</template>
<script>
    import request from '@/utils/request';
    import axios from 'axios'
    export default {
        data() {
          return {
            ruleForm: {
              id: '',
              path: '',
              url: '',
              retryable: '',
              stripPrefix: '',
              enabled: '',
              apiName: '',
              serviceId: ''
            },
          }
        },
        created() {
          request({
            url: '/getRoute',
            method: 'post',
            data: {id: this.$route.query.id}
          }).then(({data}) => {
            this.ruleForm = data
          })
        },
        methods: {
          saveInfo() {
            request({
              url: '/updateRoute',
              method: 'post',
              data: this.ruleForm
            }).then(({success, message}) => {
              this.$notify({
                type: success ? 'success' : 'error',
                message,
                duration: 2000
              })
              if (success) {
                this.$router.go(-1)
              }
            })
          }
        }
    }
</script>
<style>
    .el-row {
      margin-bottom: 20px;
    } 
</style>