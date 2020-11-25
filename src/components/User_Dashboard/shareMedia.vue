<template>
<social-sharing :url="`${hostname}/signup/${userInfo.ref_code}`"
                      title="Referral Join"
                      description="Use below code and link to refer other users and you will receive rewards of 25% from your referee's tradings. The more people you refer to BREXILY, the more you will earn."
                      quote="Referral Join"
                      hashtags="Use below code and link to refer other users and you will receive rewards of 25% from your referee's tradings. The more people you refer to BREXILY, the more you will earn."
                      twitter-user="Use below code and link to refer other users and you will receive rewards of 25% from your referee's tradings. The more people you refer to BREXILY, the more you will earn."
                      inline-template>
<div>
    <network network="whatsapp" class="mr-2 wp">
        <i class="fab fa-whatsapp-square"></i>
    </network>
    <network network="line" class="mr-2 line">
        <i class="fab fa-line"></i>
    </network>
    <network network="wechat" class="mr-2 vc">
        <i class="fab fa-weixin"></i>
    </network>
    <network network="telegram" class="mr-2 tg">
        <i class="fab fa-telegram-plane"></i>
    </network>
    <network network="facebook" class="mr-2 fb">
        <i class="fab fa-facebook-f"></i>
    </network>    
    <!--<network network="twitter" class="tw">
        <i class="fab fa-twitter"></i>
    </network>-->
</div>
</social-sharing>
</template>
<script>
    export default {
        props: {
            userInfo: {}
        },
        data: () => ({
            hostname: '',
        }),
        created() {
            this.hostname = window.location.origin
        }
    }
</script>