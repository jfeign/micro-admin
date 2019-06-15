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
              <transition name="bounce">
                <h3 v-if="getIn" class="title1">服务全面监控</h3>
              </transition>
            </div>
            <div class="section page2-bg">
              <transition name="bounce">
                <h3 v-if="getIn" class="title1">全面安全防护</h3>
              </transition>
            </div>
            <div class="section page3-bg">
              <transition name="bounce">
                <h3 v-if="getIn" class="title1">实时用户分析</h3>
              </transition>
            </div>
        </full-page>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        getIn: false,
        options: {
          afterLoad: this.afterLoad,
          scrollOverflow: true,
          scrollBar: false,
          menu: '#menu',
          navigation: true,
          anchors: ['page1', 'page2', 'page3'],
          afterLoad: (origin, destination, direction) => {
            console.log(origin)
            console.log(destination)
            console.log(direction)
            this.getIn = true
            
            // if (destination.anchor === 'page1') {
            //   this.animateCSS('.title1', 'bounce')
            // } else if (destination.anchor === 'page2') {
            //   this.animateCSS('.title2', 'fadeInRight')
            // } else if (destination.anchor === 'page3') {
            //   this.animateCSS('.title3', 'fadeInLeft')
            // }
            
          },
          onLeave: () => {
            this.getIn = false
          },
          sectionsColor: ['#41b883', '#ff5f45', '#0798ec', '#fec401', '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
        }
      }
    },
    methods: {
      animateCSS(element, animationName, callback) {
          const node = document.querySelector(element)
          node.classList.add('animated', animationName)
          function handleAnimationEnd() {
              node.classList.remove('animated', animationName)
              node.removeEventListener('animationend', handleAnimationEnd)

              if (typeof callback === 'function') callback()
          }

          node.addEventListener('animationend', handleAnimationEnd)
      },
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
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .bounce-enter-active {
      animation: bounce-in .5s;
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
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
