<template>
  <Navbar />

  <transition name="fade">
    <DarkenBox
      v-if="showDarkenBox"
      @click="hideDarkenBox"
    />
  </transition>

  <transition name="menu-slide">
    <SideMenu
      v-if="menuOpened"
    />
  </transition>

  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue'
import DarkenBox from './components/DarkenBox.vue'
import SideMenu from './components/SideMenu.vue'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    DarkenBox,
    SideMenu
  },
  methods: {
    ...mapMutations([
      'setMenuOpened'
    ]),
    hideDarkenBox() {
      // hide everything that the darken box depends on
      this.setMenuOpened()
    }
  },
  computed: {
    ...mapGetters([
      'menuOpened'
    ]),
    showDarkenBox() {
      return this.menuOpened
    }
  }
}
</script>

<style lang="scss">
@import "./sass/_classes.scss";
@import "./sass/_transitions.scss";

body {
  margin: 0;
}

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: dark(100);

  &:hover {
    background-color: dark(300);
  }
}

::-webkit-scrollbar-track {
  border-left: 1px solid light(200);
}
</style>
