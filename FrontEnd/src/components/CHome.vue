<template>
  <div class="Chome">
    <h1>{{ msg }}</h1>

    <a-carousel :afterChange="onChange">
    <div>
      <h3>
        BANK
         <center>
        <img
            alt="Vue logo"
            src="../assets/coverwhite1.png"
            height="350"
            width="270" 
          />
          </center>
      </h3>
      
    </div>
    <div>
      <h3>
        Transaction
        <br></br>
        <center>
        <img
            alt="Vue logo"
            src="../assets/Transactions.png"
            height="270"
            width="500" 
          />
          </center>
        <br></br>
        very easy
      </h3>
      
    </div>
    <div>
      <h3>
       Discount
       <br></br>
        <center>
        <img
            alt="Vue logo"
            src="../assets/discount.png"
            height="270"
            width="400" 
          />
          </center>
        
        For participating products
      </h3>
    </div>
    </a-carousel>
    </br></br>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>

  </div>
</template>

<script>
export default {
  name: "CHome",
  props: {
    msg: String
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#components-layout {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 400px;
  line-height: 10px;
  background: rgb(47, 39, 180);
  background: linear-gradient(
    90deg,
    rgb(47, 39, 180, 1) 0%,
    rgb(49, 49, 194, 1) 0%,
    rgb(147, 231, 252) 100% );
  overflow: hidden;
}

.ant-carousel >>> .slick-slide  h3 {
  color: #fff;
}
</style>
