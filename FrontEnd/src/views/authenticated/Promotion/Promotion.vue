<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>

    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-card
        style="width:100%"
        :tab-list="tabListNoTitle"
        :active-tab-key="noTitleKey"
        @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
        <p v-if="noTitleKey === 'food'"><food />rrr</p>
        <p v-if="noTitleKey === 'lifestyle'"><lifestyle />ttt</p>
        <p v-else-if="noTitleKey === 'project'">project content</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import food from "@/views/authenticated/Promotion/food.vue";
import lifestyle from "@/views/authenticated/Promotion/lifestyle.vue";

export default {
  components: {
    food,
    lifestyle
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: "food",
          tab: "food"
        },
        {
          key: "lifestyle",
          tab: "lifestyle"
        }
      ],
      key: "tab1",
      noTitleKey: "profile"
    };
  },
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
    },
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    }
  }
};
</script>
