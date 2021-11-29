<template>
  <div class="page-wrapper">
    <h1 class="title">
      Trading Pairs <img src="@/assets/images/favicon.png" alt="$" />
    </h1>
    <ul class="list-group">
      <li
        class="list-group-item"
        :class="{ 'list-group-item-info': rate.seen }"
        v-for="rate in rates"
        :key="rate._id"
        @click="getGraph(rate)"
      >
        <span>
          <img
            v-show="rate.seen"
            class="seen"
            src="@/assets/images/seen.png"
            alt="seen"
          />
          {{ rate.name }}
        </span>
        <img
          v-if="rate.favorite"
          class="add-to-favorite"
          src="@/assets/images/bookmark.png"
          alt=""
          @click.stop="clickFavorite({ ...rate, favorite: false })"
        />
        <img
          v-else
          class="add-to-favorite"
          src="@/assets/images/wishlist.png"
          alt=""
          @click.stop="clickFavorite({ ...rate, favorite: true })"
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
  methods: {
    async getGraph(rate) {
      await RatesService.update({ ...rate, seen: true });
      this.$emit("getRates");
      open(this.link + rate.name + "USDT");
    },
    async clickFavorite(rate) {
      await RatesService.update(rate);
      this.$emit("getRates");
    },
  },
};
</script>

<style scoped>
.title img {
  width: 70px;
}
.list-group {
  max-width: 500px;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
}
.list-group-item span {
  display: flex;
  align-items: center;
}
.list-group-item:hover {
  cursor: pointer;
  background-color: rgb(241, 239, 239);
}
.seen {
  width: 18px;
  margin-right: 10px;
}
.add-to-favorite {
  width: 20px;
  transition: transform 0.5s ease;
}
.add-to-favorite:hover {
  transform: scale(1.2);
}
</style>