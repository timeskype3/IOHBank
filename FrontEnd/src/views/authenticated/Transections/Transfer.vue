<template>
    <div>
        <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>User</a-breadcrumb-item>
        <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        Bill is a cat.
        <a-button :loading="loading" @click="test()">
            Test
        </a-button>
        <a-button
            type="primary"
            @click="logout()" 
            >
            LogOut
        </a-button>
        </div>
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
