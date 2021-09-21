<template>
  <div id="page" :class="{ dark: options.darkMode }">
    <Navbar />

    <transition name="fade">
      <DarkenBox
        v-if="showDarkenBox || dialog.show"
      />
    </transition>

    <transition name="menu-slide">
      <SideMenu
        v-if="menuOpened"
      />
    </transition>

    <router-view />

    <transition
      name="dialog"
      class="zoom-bounce"
    >
      <Dialog
        v-if="dialog.show"
      />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import DarkenBox from '@/components/DarkenBox.vue'
import SideMenu from '@/components/SideMenu.vue'
import Dialog from '@/components/Dialog.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Navbar,
    DarkenBox,
    SideMenu,
    Dialog
  },
  methods: {
    ...mapMutations('menu', [
      'setMenuOpened'
    ]),
    ...mapMutations('options', [
      'syncOptions'
    ])
  },
  computed: {
    ...mapState('menu', [
      'menuOpened'
    ]),
    ...mapState('options', [
      'options'
    ]),
    ...mapState('dialog', [
      'dialog',
    ]),
    showDarkenBox() {
      return this.menuOpened
    }
  },
  mounted() {
    this.syncOptions()
  }
}
</script>

<style lang="scss">
@import "./sass/_variables.scss";
@import "./sass/_classes.scss";
@import "./sass/_transitions.scss";
@import "./sass/_mediaqueries.scss";

body {
  margin: 0;
}

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#page {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &.dark {
    background-color: dark(200);
  }
}
</style>
