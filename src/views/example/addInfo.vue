<template>
  <el-form :model="ruleForm" label-width="180px">
    <el-row type="flex"  justify="center" >
      <el-col :span="14">
        <el-form-item label="ID">
          <el-input v-model="ruleForm.id" placeholder="ID"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="服务ID">
          <el-input v-model="ruleForm.serviceId" placeholder="服务ID"></el-input>
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
          <el-radio-group v-model="ruleForm.enable">
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
      <el-col :span="14">
        <el-form-item label="GEO地理位置信息">
          <el-checkbox v-model="ruleForm.geo"></el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="服务监控">
          <el-checkbox v-model="ruleForm.monitor"></el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="限流">
          <el-checkbox v-model="ruleForm.limits"></el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-col :span="14">
        <el-form-item label="限流频次">
          <el-input v-model="ruleForm.limitTimes">
            <span slot="suffix">次</span>
          </el-input>
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
    export default {
        data() {
          return {
            ruleForm: {
              id: '',
              path: '',
              url: '',
              retryable: true,
              stripPrefix: true,
              enable: true,
              apiName: '',
              serviceId: '',
              geo: '',
              monitor: '',
              limits: '',
              limitTimes: ''
            },
          }
        },
        created() {

        },
        methods: {
          saveInfo() {
            request({
              url: '/addRoute',
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