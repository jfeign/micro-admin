<template>
  <el-tabs style="height: 200px;">
    <el-tab-pane label="服务信息">
      <info></info>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
    import info from './tabs/info'
    export default {
        components: {
          info,
        }
    }
</script>
<style>
    
</style>