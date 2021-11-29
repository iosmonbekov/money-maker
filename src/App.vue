<template>
  <Home-Page />
</template>

<script>
import RatesService from "@/services/RatesService";
import HomePage from "./views/Home/Index.vue";

export default {
  components: {
    HomePage,
  },
  async created() {
    await RatesService.refreshList();
  },
};
</script>

<style>
.page-wrapper {
  padding: 20px;
}
</style>
