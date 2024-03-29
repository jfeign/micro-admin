<template>
  <div class="data-table">
    <div class="search"><slot name="conditions"></slot></div>

    <div class="table">
      <el-table
        :data="listData"
        :empty-text="emptyText"
        :default-sort="defaultSort"
        @sort-change="sortChange"
        v-loading.body="showLoading"
        element-loading-text="拼命加载中"
        size="small"
        border
        highlight-current-row
      >
        <el-table-column
          label="序号"
          width="60"
          align="center"
          class-name="list-order"
          v-if="showPageIndex"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.pageIndex }}</span>
          </template>
        </el-table-column>
        <slot name="columns"></slot>
      </el-table>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request';
import config from '@/config';
import event from '@/utils/event';

export default {
  name: 'DataTable',
  props: {
    // 默认排序
    defaultSort: {
      type: Object,
    },
    // 是否显示pageIndex列
    showPageIndex: {
      type: Boolean,
      default: false,
    },
    // 没有数据显示文字
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    // 当前页数
    currentPage: {
      type: Number,
      default: 1,
    },
    // 每页数据数量
    pageSize: {
      type: Number,
      default: config.pageSize,
    },
    // 附加查询条件
    queryParams: {
      type: Object,
    },
    // 数据接口地址
    apiUrl: {
      type: String,
    },
    // 数据载入成功后回调
    loadCallback: {
      type: Function,
      required: false,
    },
    //  是否默认渲染
    defaultRender: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      currentPageData: this.currentPage,
      pageSizeData: this.pageSize,
      pageSizes: [10, 20, 50, 100],
      total: 0,
      listData: [],
      showLoading: false,
      sortParams: {},
    };
  },
  created: function() {
    // 刷新全部数据
    this.$on(event.REFRESH_ALL_DATA, function() {
      this.reload();
    });
    // 刷新当前页数据
    this.$on(event.REFRESH_CURRENT_DATA, function() {
      this.load();
    });
    if (this.defaultRender) {
      this.load();
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSizeData = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.currentPageData = val;
      this.load();
    },
    reload() {
      this.currentPageData = 1;
      this.load();
    },
    // 排序改变，向参数注入排序字段
    sortChange(sort) {
      // 参数格式根据需要修改
      this.sortParams = sort.prop
        ? {
            prop: sort.prop,
            order: sort.order,
          }
        : {};
      this.reload();
    },
    // 载入数据
    load() {
      this.showLoading = true;

      const queryParams = Object.assign(
        {
          pageNum: this.currentPageData,
          pageSize: this.pageSizeData,
          order: this.sortParams,
        },
        this.queryParams
      );
      request({
        url: this.apiUrl,
        method: 'post',
        data: queryParams,
      }).then(d => {
          this.listData = d.data
          return d;
        })
        .then(d => {
          if (this.loadCallback) {
            this.loadCallback(d, queryParams);
          }
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.data-table {
  width: 100%;
  position: relative;
}

.data-table .pagination {
  display: block;
  text-align: right;
  margin-top: 15px;
  width: 100%;
}
</style>
