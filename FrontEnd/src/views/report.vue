<template>
  <div style="background-color: #ececec; padding: 20px;">

    <a-row :gutter="16">
      <a-col :span="6">
        <a-card title="Count of Customer Account" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in accountCount" :key="i">
              <td>{{data['FName']}} {{data['LName']}}</td>
              <td>{{data['CountOfAccount']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Number of Closed account" :bordered="false">
          <h1>{{closecount[0].count}}</h1>
          <p></p>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Churned by Banks" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bank</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in churncount" :key="i">
              <td>{{data['NewBank']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Transferred by Banks" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bank</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in transfer" :key="i">
              <td>{{data['Bank']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 15px;">
      <a-col :span="6">
        <a-card title="Bill by type" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>type</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in billing" :key="i">
              <td>{{data['Type']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Stars of transfer" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Stars</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in transferstar" :key="i">
              <td>{{data['star']}}</td>
              <td>{{data['Count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Stars of payment" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Stars</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in paymentstar" :key="i">
              <td>{{data['star']}}</td>
              <td>{{data['Count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Stars of promotion" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>stars</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in promostar" :key="i">
              <td>{{data['star']}}</td>
              <td>{{data['Count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16"  style="margin-top: 15px;">
      
      <a-col :span="6">
        <a-card title="Balance by Bank" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bank</th>
              <th>Balance</th>
            </tr>
            <tr v-for="(data, i) in bankbalance" :key="i">
              <td>{{data['Bank']}}</td>
              <td>{{data['summy']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Dailytransaction" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bank</th>
              <th>Balance</th>
            </tr>
            <tr v-for="(data, i) in dailytransaction" :key="i">
              <td>{{data['date']}}</td>
              <td>{{data['summy']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

    <a-col :span="6">
        <a-card title="Customer by Ages" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bank</th>
              <th>Balance</th>
            </tr>
            <tr v-for="(data, i) in customerbyages" :key="i">
              <td>{{data['DateDiff']}}</td>
              <td>{{data['MyCount']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Customer by Bloodtype" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Bloodtype</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in bloodtype" :key="i">
              <td>{{data['Bloodtype']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

    </a-row>
    
    <a-row :gutter="16"  style="margin-top: 15px;">

        <a-col :span="6">
        <a-card title="Customer by Nationality" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Nationality</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in national" :key="i">
              <td>{{data['Nationality']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

      <a-col :span="6">
        <a-card title="Not Paid Customer" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>Type of Bill</th>
              <th>Count</th>
            </tr>
            <tr v-for="(data, i) in notpaid" :key="i">
              <td>{{data['type']}}</td>
              <td>{{data['count']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>  
    </a-row>

    <a-row :gutter="16"  style="margin-top: 15px;">
        <a-col :span="18">
        <a-card title="Balance by Account" :bordered="false">
          <table style="width:100%;">
            <tr>
              <th>FName</th>
              <th>LName</th>
              <th>AccountTypeName</th>
              <th>Bank</th>
              <th>AllBalance</th>
            </tr>
            <tr v-for="(data, i) in moneybyaccount" :key="i">
              <td>{{data['FName']}}</td>
              <td>{{data['LName']}}</td>
              <td>{{data['AccountTypeName']}}</td>
              <td>{{data['bank']}}</td>
              <td>{{data['AllBalance']}}</td>
            </tr>
          </table>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>


<script>
import api from "@/utils/api";
export default {
  name: "reportpage",
  data() {
    return {
      accountCount: {},
      closecount: {},
      churncount: {},
      transfer: {},
      billing: {},
      promostar: {},
      paymentstar: {},
      transferstar: {},
      bankbalance:{},
      dailytransaction:{},
      customerbyages:{},
      bloodtype:{},
      national:{},
      notpaid:{},
      moneybyaccount:{}
    };
  },
  mounted() {
    api()
      .get("/report/accountcount")
      .then(({ data }) => {
        this.accountCount = data;
      }),
      api()
        .get("/report/churncount")
        .then(({ data }) => {
          this.churncount = data;
        }),
      api()
        .get("/report/transfer")
        .then(({ data }) => {
          this.transfer = data;
        }),
      api()
        .get("/report/billing")
        .then(({ data }) => {
          this.billing = data;
        }),
      api()
        .get("/report/transferstar")
        .then(({ data }) => {
          this.transferstar = data;
        }),
      api()
        .get("/report/paymentstar")
        .then(({ data }) => {
          this.paymentstar = data;
        }),
      api()
        .get("/report/promostar")
        .then(({ data }) => {
          this.promostar = data;
        }),
        api()
        .get("/report/bankbalance")
        .then(({ data }) => {
          this.bankbalance = data;
        }),
        api()
        .get("/report/dailytransaction")
        .then(({ data }) => {
          this.dailytransaction = data;
        }),
        api()
        .get("/report/customerbyages")
        .then(({ data }) => {
          this.customerbyages = data;
        }),
        api()
        .get("/report/bloodtype")
        .then(({ data }) => {
          this.bloodtype = data;
        }),
        api()
        .get("/report/national")
        .then(({ data }) => {
          this.national = data;
        }),
        api()
        .get("/report/notpaid")
        .then(({ data }) => {
          this.notpaid = data;
        }),
        api()
        .get("/report/moneybyaccount")
        .then(({ data }) => {
          this.moneybyaccount = data;
        }),
      api()
        .get("/report/closecount")
        .then(({ data }) => {
          this.closecount = data;
        });
  }
};
</script>
<style scoped>
.ant-card {
    height: 250px !important;
}
</style>
