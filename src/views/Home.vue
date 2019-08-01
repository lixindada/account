<template>
  <div class="home">
    <div class="window">
      <router-view/>
    </div>
    <v-footer-tab></v-footer-tab>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vFooterTab from '@/components/footerTab.vue' // @ is an alias to /src

@Component({
    components: {
        vFooterTab
    }
})
export default class Home extends Vue {}
</script>
<style lang="less">
  .home{
    .window{
      height: calc(100vh - 50px);
      overflow: auto;
    }
  }
</style>
