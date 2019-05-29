<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '100px' }">
      <p>Search with invoice No.</p>
      <a-select
        v-decorator="[
          'company',
          {
            rules: [
              {
                required: true,
                message: 'Please select Company'
              }
            ]
          }
        ]"
        size="large"
        style="width:500px"
        placeholder="Please select Company"
      >
        <a-select-option value="ais"> AIS </a-select-option>
        <a-select-option value="dtac"> Happy (DTAC) </a-select-option>
        <a-select-option value="truemove"> TrueMove </a-select-option>
        <a-select-option value="truemoney"> TrueMoney </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  data: () => ({
    loading: false
  }),
  methods: {
    test() {
      this.loading = true;
      api
        .get("/auth")
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
