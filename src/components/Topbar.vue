<template>
  <div>
    <div class="brand">
      <h2>{{ systemName }}</h2>
    </div>
    <span @click="$router.push('/')" style='margin-right: 20px'>
      首页
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';
import actionTypes from '@/store/action-types';

export default {
  name: 'Topbar',
  data() {
    return {
      systemName: config.systemName,
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    logout() {
      this.$confirm('是否退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch(actionTypes.logout).then(() => {
            this.$router.push({ path: '/login' });
          });
        })
        .catch(() => {});
    },
  },
};
</script>
