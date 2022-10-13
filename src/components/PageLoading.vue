<template>
  <div class="loading Tshirt"
    ref="loading">
    <i class="fas fa-tshirt fa-2x tshirt"></i>
    <span>Loading</span>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.$emitter.on('page-loading', (val) => {
      const body = document.querySelector('body');
      this.isLoading = val; // true or false
      if (val) {
        this.$refs.loading.classList.remove('d-none'); // 移除loading
        body.setAttribute('class', 'mh-100vh overflow-hidden');
      } else {
        setTimeout(() => {
          this.$refs.loading.classList.add('d-none');
          body.setAttribute('class', '');
        }, 200);
      }
    });
  },
  created() {
  },
};
</script>
