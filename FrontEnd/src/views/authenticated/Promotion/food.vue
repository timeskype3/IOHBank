<template>
  <a-card title="Brand + product name">
    <a-card-grid style="width:33.33%;textAlign:'center'">
      <div>
        <span style="font-weight:bold;">Store : </span>
        <span style="font-weight:bold;">food.StoreID</span>
      </div>
    </a-card-grid>

    <a-card-grid style="width:33.33%;textAlign:'center'">
      <div>
        <span style="font-weight:bold;">type : </span>
        <span style="font-weight:bold;">discount/freegift</span>
      </div>
    </a-card-grid>

    <a-card-grid style="width:33.34%;textAlign:'center'">
      Account Name
    </a-card-grid>
  </a-card>
</template>
<script>
export default {
  name: "Food",
  data: () => ({
    food: {}
  }),
  computed: {},
  mounted() {}
};
</script>
