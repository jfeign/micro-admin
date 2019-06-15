<template>
  <el-tabs style="height: 200px;">
    <el-tab-pane label="服务信息">
      <info></info>
    </el-tab-pane>
    <el-tab-pane label="过滤器设置">
      <filterSet></filterSet>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
    import filterSet from './tabs/filterSet'
    import info from './tabs/info'
    import load from './tabs/load'
    export default {
        components: {
          filterSet,
          info,
          load
        }
    }
</script>
<style>
    
</style>