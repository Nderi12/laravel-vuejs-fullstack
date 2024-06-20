<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="../../index2.html"><b>Lara </b>App</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>
    
                    <form method="post" @submit.prevent="handleLogin">
                        <div class="input-group mb-3">
                            <input
                                id="email"
                                type="email"
                                v-model="form.email"
                                class="form-control"
                                placeholder="Email"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input
                                id="password"
                                type="password"
                                v-model="form.password"
                                class="form-control"
                                placeholder="Password"
                                required
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <!-- /.col -->
                            <div class="col-12">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block"
                                >
                                    Sign In
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    
                    <router-link class="mt-3" to="/register">
                        Register a new membership
                    </router-link>
                    <!-- <router-link
                        class="text-center"
                        to="/register"
                    >
                        Sign Up
                    </router-link> -->
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
        <!-- /.login-box -->
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup() {
        const errors = ref(null);
        const router = useRouter();
        const form = reactive({
            email: "",
            password: "",
        });

        const handleLogin = async () => {
            try {
                const result = await axios.post("/api/auth/login", form);
                if (result.status === 200 && result.data && result.data.token) {
                    localStorage.setItem("accessToken", result.data.token);
                    await router.push({ name: "strategy-analysis" });
                }
            } catch (e) {
                if (e.response && e.response.data) {
                    if (e.response.data.errors) {
                        errors.value = Object.values(e.response.data.errors);
                    } else {
                        errors.value =
                            e.response.data.message || "An error occurred";
                    }
                } else {
                    errors.value = "An error occurred";
                }
            }
        };

        return {
            form,
            errors,
            handleLogin,
        };
    },
};
</script>
