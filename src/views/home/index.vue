<template>
    <div id="app">
        <ul id="menu">
            <li data-menuanchor="page1" class="active"><a href="#page1">分析</a></li>
            <li data-menuanchor="page2"><a href="#page2">保护</a></li>
            <li data-menuanchor="page3"><a href="#page3">监控</a></li>
        </ul>
        <ul class="actions">
            <li>
                <span class="actions-button" rel="noopener" @click="toAdmin">WELCOME</span>
            </li>
        </ul>

        <full-page :options="options" id="fullpage">
            <div class="section page1-bg">
              <h3>服务的全面监控</h3>
            </div>
            <div class="section page2-bg">
              <h3>全面的安全防护</h3>
            </div>
            <div class="section page3-bg">
              <h3>实时用户分析</h3>
            </div>
        </full-page>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        options: {
          afterLoad: this.afterLoad,
          scrollOverflow: true,
          scrollBar: false,
          menu: '#menu',
          navigation: true,
          anchors: ['page1', 'page2', 'page3'],
          sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
        }
      }
    },
    methods: {
      toAdmin() {
        this.$router.push('/example')
      },
      afterLoad () {
        console.log('After load')
      },
      toggleNavigation () {
        this.options.navigation = !this.options.navigation
      },
      toggleScrollbar () {
        console.log('Changing scrollbar...')
        this.options.scrollBar = !this.options.scrollBar
      }
    }
  }
</script>

<style>


    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
    .page1-bg {
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(./imgs/page1.jpg)
    }
    .page2-bg {
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(./imgs/page2.jpg)
    }
    .page3-bg {
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(./imgs/page3.jpg)
    }
</style>
