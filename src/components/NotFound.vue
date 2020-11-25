<template>
<div class="notfound_main_wrp">
<div class="notfound">
    <div class="notfound-404">
        <h1>404</h1>
        <h2>Page not found</h2>
    </div>
    <a :href="`${websiteUrl}`">Homepage</a>
</div>
</div>
</template>
<script>
export default {
    name: 'RecoverPasswrod',
    data() {
        return {
            websiteUrl: ''
        }
    },
    mounted: function () {
        this.websiteUrl = process.env.VUE_APP_WEBSITE_URL
    },
}
</script>