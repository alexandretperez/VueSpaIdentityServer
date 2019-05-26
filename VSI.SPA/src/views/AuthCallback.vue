<template>
    <h1>AuthCallback</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IdentityService } from '../services/IdentityService';

const service = new IdentityService();
let unwatcher: () => void;

@Component
export default class AuthCallback extends Vue {
    mounted() {
        service.completeAuthentication();
        unwatcher = this.$store.watch(
            (state, getters) => state.user,
            value => {
                console.log(value);
                this.$router.push('/protected');
            }
        );
    }
    destroyed() {
        if (unwatcher) {
            unwatcher();
        }
    }
}
</script>
