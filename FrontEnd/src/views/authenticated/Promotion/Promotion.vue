<template>
    <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>User</a-breadcrumb-item>
      <a-breadcrumb-item>Bill</a-breadcrumb-item>
    </a-breadcrumb>
        
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