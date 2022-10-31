<template>
<ToastMessage/>
  <PageLoading/>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route(to) {
      const nowTitle = to.meta.title || '';
      document.title = `${nowTitle} Nature`;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/css/style.scss'
</style>
