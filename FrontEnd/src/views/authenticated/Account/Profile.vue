<template>
  <div>

      <template>
        <a-card title="{fname} {lname}">
          <a-card-grid style="width:33%;textAlign:'center'">Username</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">clientID</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">Nationality</a-card-grid>
          
          <a-card-grid style="width:33%;textAlign:'center'">Gender</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">DOB</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">Bloodgroup</a-card-grid>
          
          <a-card-grid style="width:33%;textAlign:'center'">Adress</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">E-mail</a-card-grid>
          <a-card-grid style="width:33%;textAlign:'center'">Tel</a-card-grid>
        </a-card>
</template>

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
