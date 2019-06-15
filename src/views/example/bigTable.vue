<template>
  <div>
    <data-table
      ref="dateTable"
      :queryParams="queryParams"
      :apiUrl="apiUrl"
    >
      <div slot="conditions">
        <el-form :inline="true" :model="queryParams">
          <el-form-item>
            <!--注意这里判断action的方式-->
            <el-button @click="$router.push('/example/addInfo')" type="success" size="small"
              >新建服务</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <template slot="columns">
        <el-table-column  label="ID" align="center">
          <template scope="{row}">
            <span @click="toDetail(row.id)" :style="{color: 'rgb(0, 193, 222)', cursor: 'pointer'}">{{row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路径" align="left"></el-table-column>
        <el-table-column prop="url" label="URL" align="center"></el-table-column>
        <el-table-column prop="serviceId" label="服务ID" align="center"></el-table-column>
        <el-table-column label="是否重试" align="center">
          <template scope="{row}">
            {{row.retryable === true ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column label="是否重写前缀" align="center">
          <template scope="{row}">
            {{row.stripPrefix === true ? '是' : '否'}}
          </template>
        </el-table-column>
       <el-table-column prop="apiName" label="apiName" align="center">
       </el-table-column>
      <el-table-column label="跳转" align="center">
        <template>
          <a href="https//www.baidu.com"></a>
        </template>
       </el-table-column>
      </template>
    </data-table>
  </div>
</template>

<script>
import api from '@/resources/api';
import action from '@/resources/action';
import DataTable from '@/components/DataTable';
import event from '@/utils/event';

export default {
  name: 'bigTable',
  components: {
    DataTable,
  },
  data() {
    return {
      action,
      apiUrl: '/listRoute',
      queryParams: {
        keyword: '',
      },
    };
  },
  mounted() {},
  methods: {
    onQuery() {
      this.$refs.dateTable.$emit(event.REFRESH_ALL_DATA);
    },
    toDetail(id) {
      console.log(id)
      this.$router.push({path: '/example/tabs', query: {id}})
    },
    loadCallback(data, queryParams) {
      this.$notify.info({
        title: '查询参数',
        message: JSON.stringify(queryParams || {}),
      });
    },
  },
};
</script>
