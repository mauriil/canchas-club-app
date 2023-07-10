<template >
    <div class="container">
        <div class="w-full min-h-screen p-5 md:p-20 flex items-center justify-center">
            <div class="w-96 intro-y">
                <img class="mx-auto w-16" alt="Rocketman - Tailwind HTML Admin Template" src="../../assets/images/vue.svg">
                <div class="text-white dark:text-slate-300 text-2xl font-medium text-center mt-14">Ingreso
                </div>
                <div
                    class="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                    <form @submit.prevent="login">
                        <input type="text" class="form-control py-3 px-4 block" placeholder="Email" id="username" v-model="username">
                        <input type="password" class="form-control py-3 px-4 block mt-4" placeholder="Contraseña" id="password" v-model="password">

                        <div class="text-slate-500 flex text-xs sm:text-sm mt-4">
                            <a href="/#/auth/passwordReset">Olvide mi contraseña</a>
                        </div>
                        <div class="mt-5 xl:mt-8 text-center xl:text-left">
                            <button disabled v-if="formSubmitted" class="w-full xl:mr-3"> <pulse-loader :loading="loading" color="#00195F"
                                :size="size"></pulse-loader></button>
                            <button class="btn btn-primary w-full xl:mr-3" type="submit" v-if="!formSubmitted">Ingresar</button>
                            <router-link to="/register"> <button class="btn btn-outline-secondary w-full mt-3">Registrarse</button> </router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueJwtDecode from 'vue-jwt-decode';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
const $toast = useToast();
import authService from '../../services/auth/index';

export default {
    name: 'Login',
    components: {
        PulseLoader
    },
    data() {
        return {
            username: '',
            password: '',
            formSubmitted: false,
        }
    },
    methods: {
        async login() {
            this.formSubmitted = true;
            try {
                const loggedUser = await authService.login(this.username, this.password);
                const decoded = VueJwtDecode.decode(loggedUser.access_token)

                localStorage.setItem('token', loggedUser.access_token);
                localStorage.setItem('userId', decoded.userId);
                this.$router.push('/');
            } catch (error) {
                this.formSubmitted = false;
            }
        }
    },

}
</script>