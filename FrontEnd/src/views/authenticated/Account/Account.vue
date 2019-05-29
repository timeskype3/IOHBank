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
        <p v-if="noTitleKey === 'profile'">
          <Profile />
        </p>
        <p v-if="noTitleKey === 'bankaccount'">
          <BankAccount />
        </p>
        <p v-if="noTitleKey === 'deposit'">
          <Deposit />
        </p>
        <p v-else-if="noTitleKey === 'project'">project content</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import Profile from "@/views/authenticated/Account/Profile.vue";
import BankAccount from "@/views/authenticated/Account/BankAccount.vue";
import Deposit from "@/views/authenticated/Account/Deposit.vue";

export default {
  components: {
    Profile,
    BankAccount,
    Deposit
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: "profile",
          tab: "Profile"
        },
        {
          key: "bankaccount",
          tab: "Bank Account"
        },
        {
          key: "deposit",
          tab: "Deposit"
        }
      ],
      key: "tab1",
      noTitleKey: "profile"
    };
  },
  methods: {
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    }
  }
};
</script>
