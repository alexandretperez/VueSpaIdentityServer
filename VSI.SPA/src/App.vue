<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>&nbsp;|&nbsp;
            <router-link to="/protected">Protected</router-link>
        </div>
        <div v-if="isAuthenticated">
            <button @click="logout()">Logout</button>
        </div>
        <router-view/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IdentityService } from './services/IdentityService';

const service = new IdentityService();

@Component
export default class Home extends Vue {
    public get isAuthenticated() {
        return this.$store.getters.isAuthenticated;
    }
    public logout() {
        service.logout();
    }
}
</script>


<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50

#nav
    padding 30px

    a
        font-weight bold
        color #2c3e50

        &.router-link-exact-active
            color #42b983
</style>
