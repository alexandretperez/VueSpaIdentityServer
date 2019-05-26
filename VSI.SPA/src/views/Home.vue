<template>
    <div>
        <h1>Home</h1>
        <h3>Unsafe API:</h3>
        <code>{{data}}</code>
        <h3>Unsafe API:</h3>
        <code>{{claims}}</code>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
    public data: any[] = [];
    public claims: any[] = [];
    mounted() {
        window.setTimeout(() => {
            this.unsafeData();
            this.safeData();
        }, 500);
    }
    public unsafeData() {
        fetch('http://localhost:5001/api/unsafe')
            .then(response => response.json())
            .then(value => (this.data = value));
    }

    public safeData() {
        const { access_token, token_type } = this.getUserData();
        const headers = {
            Authorization: `${token_type} ${access_token}`
        };
        fetch('http://localhost:5001/api/values', { headers })
            .then(response => {
                if (response.status === 401) {
                    return [response.statusText];
                }
                return response.json();
            })
            .then(value => (this.claims = value));
    }

    private getUserData() {
        const user = this.$store.state.user || {};
        return user;
    }
}
</script>
