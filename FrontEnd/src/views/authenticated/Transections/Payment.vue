<template>
    <div>
        <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '100px' }">
        Search with invoice No.
        </div>
        <a-input-search 
        style="width:500px"
        placeholder="Enter your Invoice No." 
        @search="onSearch" 
        enterButton="Search" 
        size="large" 
        />
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
