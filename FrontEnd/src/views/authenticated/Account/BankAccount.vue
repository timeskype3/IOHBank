<template> </template>

<script>
import jwt from "jsonwebtoken";
import api from "@/utils/api";

export default {
  data: () => ({
    profile: {}
  }),
  computed: {
    name() {
      return jwt.decode(localStorage.getItem("token"));
    }
  },
  mounted() {
    api()
      .get("/profile")
      .then(({ data }) => {
        this.profile = data;
      });
  }
};
</script>
