<template>
<div>
  

  <a-card :title="promotion[0].PromotionName" style="size:Big">
    <p><h3>{{promotiondate[0].StartDate}} - {{promotiondate[0].EndDate}}</h3></p>
    <a-row>
    <a-col :span="12">
    <a-card :title="promotion[0].GiftName">
       <p><h4>Gift Value : {{ promotion[0].Price }} </h4></p>
      
         <a-popconfirm
          size="large"
          ok-text="Yes"
          cancel-text="No"
          @confirm="$message.success('Processing complete!')"
        >
          <template slot="title">
            <p>Comfirm Apply?</p>
          </template>
          <a-button type="primary">Confirm Top-Up?</a-button>
        </a-popconfirm>

    </a-card>
    </a-col>

    <a-col :span="12"> 
    <a-card :title="promotion[0].ProductName">
      <p><h4>Discount : {{promotion[0].Discount}}</h4></p>
      <p><h5>Price : {{promotion[0].ProductPrice - 30}} FROM {{promotion[0].ProductPrice}}</h5></p>
      
       <a-popconfirm
          size="large"
          ok-text="Yes"
          cancel-text="No"
          @confirm ="food2()"
        >
          <template slot="title">
            <p>Comfirm Top-Up?</p>
          </template>
          <a-button type="primary">Confirm Apply?</a-button>
        </a-popconfirm>
    </a-card>
    </a-col>



    </a-row>
  </a-card>
</div>



</template>
<script>
import api from "@/utils/api";

export default {
 
  data() {
    return {
     promotion:{},promotiondate:{}
    };
  },
  mounted() {
    api()
        .get("/report/promotiondate")
        .then(({ data }) => {
          this.promotiondate = data;
        }),
    api()
        .get("/report/promotion")
        .then(({ data }) => {
          this.promotion = data;
        });
  },
  methods: {
    food2() {
      this.$router.push("/food2");
    },
  }
};
</script>

