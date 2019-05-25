<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CHome msg="Welcome to InOurHeart Online Banking" />
  </div>
</template>

<script>
// @ is an alias to /src
import CHome from "@/components/CHome.vue";

export default {
  name: "home",
  components: {
    CHome
  }
};
</script>
