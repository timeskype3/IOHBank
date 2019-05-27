<template>
    <div>
        <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '150px' }">
        Want some Top-Up? 
        </div>

        <a-form>

            <a-form-item>
                <a-select 
                size="large" 
                style="width:500px"
                placeholder = "Please select Company"
                v-decorator="[
                'company',
                    {
                        rules: [{
                        required: true, message: 'Please select Company',
                    }]
                    }
                ]"
                >
                <a-select-option value="ais"> AIS </a-select-option>
                <a-select-option value="dtac"> Happy (DTAC) </a-select-option>
                <a-select-option value="truemove"> TrueMove </a-select-option>
                <a-select-option value="truemoney"> TrueMoney </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-select 
                size="large" 
                style="width:500px"
                placeholder = "Select payment account"
                v-decorator="[
                'account',
                    {
                        rules: [{
                        required: true, message: 'Please select account',
                    }]
                    }
                ]"
                >
                <a-select-option value="Account1"> account1 </a-select-option>
                
                </a-select>
            </a-form-item>

            <a-form-item>
                <a-popconfirm  
                size="large" 
                okText="Yes" 
                cancelText="No" 
                @confirm = "$message.success('Processing complete!')">
                    <template slot="title">
                        <p>Comfirm Top-Up?</p>
                    </template>
                    <a-button type = "primary">Confirm Top-Up?</a-button>
                </a-popconfirm>
            </a-form-item>

        </a-form>

        

    </div>
</template>

<script>
import api from '@/utils/api'

export default {
    data: () => ({
        loading: false
    }),
    methods: {
        test() {
            this.loading = true
            api.get('/auth').then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
