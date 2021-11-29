<template>
  <div class="page-wrapper">
    <h1 class="title">
      Favorites <img src="@/assets/images/favorite.png" alt="$" />
    </h1>
    <h3 v-if="!rates?.length">No Favorites</h3>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="rate in rates"
        :key="rate._id"
        @click="getGraph(rate)"
      >
        <span>
          {{ rate.name }}
        </span>
        <img
          class="add-to-favorite"
          src="@/assets/images/bookmark.png"
          alt=""
          @click.stop="removeFromFavorite(rate)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RatesService from "@/services/RatesService";
export default {
  props: {
    rates: Array,
  },
  emits: ["getRates"],
  data() {
    return {
      link: "https://www.tradingview.com/chart/?symbol=BINANCE%3A",
    };
  },
  computed: {
    rates() {
      return this.rates.filter((el) => el.favorite);
    },
  },
  methods: {
    getGraph(rate) {
      open(this.link + rate.name + "USDT");
    },
    async removeFromFavorite(rate) {
      await RatesService.update({ ...rate, favorite: false });
      this.$emit("getRates");
    },
  },
};
</script>

<style scoped>
.title {
  height: 87px;
  display: flex;
  align-items: center;
}
.title img {
  width: 70px;
  margin-left: 10px;
}
.list-group {
  max-width: 500px;
}
.list-group-item span {
  display: flex;
  align-items: center;
}
.list-group-item:hover {
  cursor: pointer;
  background-color: rgb(241, 239, 239);
}
.list-group-item {
  display: flex;
  justify-content: space-between;
}
.add-to-favorite {
  width: 20px;
  transition: transform 0.5s ease;
}
.add-to-favorite:hover {
  transform: scale(1.2);
}
</style>