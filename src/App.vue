<template>
  <DraggableTodo />
</template>

<script>
import DraggableTodo from './components/DraggableTodo.vue'

export default {
  name: 'App',
  components: {
    DraggableTodo
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
