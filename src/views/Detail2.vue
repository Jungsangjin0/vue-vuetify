<template>
  <div>
    detail page
    {{ userId }}
    {{ this.$route.params.name }}
    {{ this.$store.state.loginStatus }}
    {{ this.$store.getters.isLogin }}
  </div>
</template>

<script>
export default {
  computed: {
    userId () {
      return this.$route.params.postsId
    },
    test () {
      return this.$store.state.loginStatus
    }
  }
}
</script>
