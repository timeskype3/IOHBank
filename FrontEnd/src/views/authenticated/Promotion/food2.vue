<template>
    <div style="background-color: #ececec; padding: 20px;">
   
      <a-col :span="24">
        <a-card title="Please Rate the App" :bordered=false>
            <template>
                <span>
                    <a-rate v-model='value'/>
                    <span class="ant-rate-text">{{value}} stars</span>
                </span><p></p>
                <a-button 
                type="primary"
                @click="rating"
                >Submit</a-button>
            </template>
        </a-card>
      </a-col> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            value:0,
        }
    },
    methods :{
        rating(){
        
        }

    }
}
</script>

