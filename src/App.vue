<template>
  <b-container>
    <h2>Todo List</h2>
    <b-form-group>
      <b-form-radio-group
        v-model="disp"
        buttons
        button-variant="outline-primary"
      >
        <b-form-radio value="0">すべて({{ itemsCount }})</b-form-radio>
        <b-form-radio value="1">未修得({{ notDoneItemsCount }})</b-form-radio>
        <b-form-radio value="2">修得済({{ doneItemsCount }})</b-form-radio>
      </b-form-radio-group></b-form-group
    >
    <b-form-group
      ><b-btn variant="primary" @click="twitterShare"
        ><font-awesome-icon
          :icon="[`fab`, `twitter`]"
          fa-fw
          size="lg"
        />シェアする</b-btn
      >
      <b-btn @click="resetItems()">すべてを忘れる</b-btn></b-form-group
    >
    <transition-group class="row" name="list-complete" tag="div"
      ><b-col
        md="6"
        lg="4"
        v-for="item in items"
        :key="item.id"
        class="list-complete-item"
      >
        <Animated enter="flipInY" leave="flipOutY" mode="out-in">
          <b-card
            class="mb-4"
            :key="item.done"
            :border-variant="item.done ? `success` : ``"
            :text-variant="item.done ? `success` : ``"
            ><b-card-title>No{{ item.id }}.{{ item.title }}</b-card-title>
            <b-card-text>{{ item.detail }}</b-card-text>
            <b-btn
              @click="changeDone(item.id)"
              :variant="item.done ? `success` : ``"
              >{{ item.done ? `修得済` : `未修得` }}</b-btn
            ></b-card
          ></Animated
        >
      </b-col></transition-group
    >
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      disp: "0",
    };
  },
  created() {
    this.$store.dispatch("readItems");
  },
  computed: {
    ...mapGetters([
      "itemsCount",
      "doneItems",
      "doneItemsCount",
      "notDoneItems",
      "notDoneItemsCount",
    ]),
    items() {
      switch (this.disp) {
        case "0":
          return this.$store.state.items;
        case "1":
          return this.notDoneItems;
        default:
          return this.doneItems;
      }
    },
  },
  methods: {
    ...mapActions(["changeDone", "resetItems"]),
    twitterShare() {
      //シェアする画面を設定
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "私は全スキル" +
        this.itemsCount +
        "個中、" +
        this.doneItemsCount +
        "個、修得しました。";
      //+ "&url=" +
      // "https://code.ameneko.com/twitter-share";
      //シェア用の画面へ移行
      location.href = shareURL;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-complete-item {
  transition: all 0.5s ease;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(5em);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
