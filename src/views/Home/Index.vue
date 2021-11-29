<template>
  <div class="container rates-page">
    <MainList :rates="this.rates" @getRates="getRates" />
    <FavoriteList :rates="this.rates" @getRates="getRates" />
  </div>
</template>

<script>
import MainList from "@/components/MainList";
import FavoriteList from "@/components/FavoriteList";
import RatesService from "@/services/RatesService";

export default {
  components: {
    MainList,
    FavoriteList,
  },
  data() {
    return {
      rates: [],
    };
  },
  mounted() {
    this.getRates();
  },
  methods: {
    async getRates() {
      this.rates = await RatesService.get();
    },
  },
};
</script>

<style scoped>
.rates-page {
  display: flex;
  justify-content: space-between;
}
.rates-page div {
  flex: 1 1 40%;
}
</style>