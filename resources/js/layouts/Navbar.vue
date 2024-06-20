<template>
    <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
        <div class="container">
            <router-link to="/dashboard" class="navbar-brand">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"
                    alt="AdminLTE Logo" class="brand-image" style="opacity: .8">
                <!-- <span class="brand-text font-weight-light">Lara App</span> -->
            </router-link>

            <button
                class="navbar-toggler order-1"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse order-3" id="navbarCollapse">
                <!-- Left navbar links -->
                <!-- <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link text-bold">Home</router-link>
                    </li>
                </ul> -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link to="/strategy-analysis" class="nav-link text-bold">Strategy Analyzer</router-link>
                    </li>
                </ul>
            </div>

            <!-- Right navbar links -->
            <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
            </ul>
        </div>
    </nav>
</template>
<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const isAuthenticated = ref(!!localStorage.getItem('accessToken'));
      const router = useRouter();
  
      const goToLogin = () => {
        router.push('/login');
      };
  
      const logout = () => {
        localStorage.removeItem('accessToken');
        isAuthenticated.value = false;
        router.push('/');
      };
  
      return {
        isAuthenticated,
        goToLogin,
        logout,
      };
    },
  };
</script>