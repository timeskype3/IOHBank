<template>
  <div>
    <p>
      {{ profile }}
    </p>
  </div>
</template>

<script>
import api from "@/utils/api";

export default {
  data: () => ({
    profile: {}
  }),
  mounted() {
    api()
      .get("/profile")
      .then(({ data }) => {
        this.profile = data;
      });
  }
};
</script>
