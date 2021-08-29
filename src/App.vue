<template>
<div id="app">

    <v-app id="inspire">
      <!-- 사이드 바 -->
      <v-navigation-drawer
        v-model="drawer"
        app
      >
        <!-- 리스트 시작 -->
        <v-list dense nav>
          <v-list-item link :to="{path:'/'}">
            <v-list-item-action>
              <!-- <v-icon>mdi-home</v-icon> -->
              <font-awesome-icon icon="home"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="pr-10">Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="{name: 'posts'}">
            <v-list-item-action>
                <font-awesome-icon icon="clipboard-list"/>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="pr-10">Board</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>
      <!-- 사이드 바 끝 -->
      <!-- 상단 바-->
      <v-app-bar
        app
        dark
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer/>

        <v-toobar-title  v-if="loginStatus" class="text-h5">{{ this.loginStatus }}</v-toobar-title>
        <v-toobar-title  v-else class="text-h5" :to="{path: '/'}"><router-link  :to="{name: 'login'}" tag="span">로그인</router-link></v-toobar-title>
      </v-app-bar>
      <!--상단 바 끝 -->

      <v-main>
          <router-view></router-view>
      </v-main>
    </v-app>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  props: {
    source: String
  },

  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapState(['loginStatus'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
span {
  cursor: pointer;
}
</style>
