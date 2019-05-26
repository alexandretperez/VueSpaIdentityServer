<template>
    <div class="about">
        <h1>Protected View!</h1>
        <code>{{user}}</code>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Protected extends Vue {
    public get user() {
        return this.$store.state.user;
    }
    public mounted() {
        fetch('');
    }
}
</script>
