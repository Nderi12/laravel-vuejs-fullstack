<template>
    <!-- Content Wrapper. Contains page content -->
      <!-- Main content -->
      <div class="centered-content">
          <h1>Welcome to My Fullstack Lavavel Vue.js Application</h1>
          <p>Get started by logging in:</p>
          <div class="mt-3">
              <button v-if="!isAuthenticated" type="button" class="btn btn-primary mr-2" @click="goToLogin">Login</button>
              <button v-if="isAuthenticated" type="button" class="btn btn-secondary" @click="logout">Logout</button>
          </div>
      </div>
        <!-- /.content -->
    <!-- /.content-wrapper -->
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
<style scoped>
  .centered-content {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
  }
</style>