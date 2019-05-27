<template>
  <div>
    <a-card title="Information">
      <a-card-grid style="width:25%;textAlign:'center'"
        >Account Name</a-card-grid
      >
      <a-card-grid style="width:75%;textAlign:'center'">{{
        profile.FName + " " + profile.LName
      }}</a-card-grid>

      <a-card-grid style="width:25%;textAlign:'center'">Gender</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">{{
        profile.Gender
      }}</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">Age</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">{{
        new Date().getFullYear() - profile.DateOfBirth.split("-")[0]
      }}</a-card-grid>

      <a-card-grid style="width:25%;textAlign:'center'">Adress</a-card-grid>
      <a-card-grid style="width:75%;textAlign:'center'">{{
        profile.Address
      }}</a-card-grid>

      <a-card-grid style="width:25%;textAlign:'center'">E-mail</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">{{
        profile.Email
      }}</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">Phone</a-card-grid>
      <a-card-grid style="width:25%;textAlign:'center'">{{
        "0" + profile.Tel
      }}</a-card-grid>

      <a-card-grid style="width:25%;textAlign:'center'"
        >Nationality</a-card-grid
      >
      <a-card-grid style="width:25%;textAlign:'center'">{{
        profile.Nationality
      }}</a-card-grid>
    </a-card>

    <p>
      {{ profile }}
    </p>
  </div>
</template>

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
