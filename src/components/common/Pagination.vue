<template>
  <div class="pagination flex w-full">
    <button
      v-if="showFirstAndLastButton"
      class="bg-blue-500 hover:bg-blue-700 p-1 mx-1 px-2 rounded text-white"
      @click="handleClick(`first`)"
    >
      First
    </button>
    <button
      v-if="showPreviousAndNextButton"
      class="bg-blue-500 hover:bg-blue-700 p-1 mx-1 px-2 rounded text-white"
      @click="handleClick(`previous`)"
    >
      <font-awesome-icon icon="arrow-left" />
    </button>
    <div v-if="showNumberButton">
      <button
        v-for="pageIndex in 10"
        v-show="pageIndex - 1 + firstNumber <= numberOfPages"
        :key="pageIndex - 1 + firstNumber"
        class="hover:bg-blue-700 p-1 mx-1 px-2 rounded text-white"
        :class="{
          'bg-blue-700': activePage == pageIndex - 1 + firstNumber,
          'bg-blue-500': activePage != pageIndex - 1 + firstNumber
        }"
        @click="handleClick(`${pageIndex - 1 + firstNumber}`)"
      >
        {{ pageIndex - 1 + firstNumber }}
      </button>
    </div>
    <button
      v-if="showPreviousAndNextButton"
      class="bg-blue-500 hover:bg-blue-700 p-1 mx-1 px-2 rounded text-white"
      @click="handleClick(`next`)"
    >
      <font-awesome-icon icon="arrow-right" />
    </button>
    <button
      v-if="showFirstAndLastButton"
      class="bg-blue-500 hover:bg-blue-700 p-1 mx-1 px-2 rounded text-white"
      @click="handleClick(`last`)"
    >
      Last
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  @Prop({ required: true })
  numberOfPages!: Number;

  @Prop({ required: true })
  activePage!: Number;

  @Prop({ default: false })
  showFirstAndLastButton!: Boolean;

  @Prop({ default: false })
  showPreviousAndNextButton!: Boolean;

  @Prop({ default: true })
  showNumberButton!: Boolean;

  private firstNumber = 0;

  mounted() {
    this.getButtonsRange();
  }

  @Emit()
  pageClick(page: string) {
    switch (page) {
      case "first":
        return "1";
      case "last":
        return this.numberOfPages;
      case "previous":
        return this.activePage - 1 > 0 ? this.activePage - 1 : 1;
      case "next":
        return this.activePage + 1 <= this.numberOfPages
          ? this.activePage + 1
          : this.numberOfPages;
      default:
        return page;
    }
  }

  @Watch("activePage")
  onPropertyChanged(value: string, oldValue: string) {
    this.getButtonsRange();
  }

  private handleClick(page: string) {
    this.pageClick(page);
  }

  private getButtonsRange() {
    const rangeFirstNumber = this.activePage - 5;
    const leftButtons = rangeFirstNumber <= 0 ? 1 : rangeFirstNumber;
    this.firstNumber = leftButtons;
  }
}
</script>
