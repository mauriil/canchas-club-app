<template >
    card de payment
</template>
<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
    name: 'MercadoPagoPayment',
    components: {
        PulseLoader
    },
    data() {
        return { }
    },
    methods: {},

}
</script>