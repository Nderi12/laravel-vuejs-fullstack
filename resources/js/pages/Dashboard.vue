<!-- resources/js/components/Home.vue -->
<template>
    <div class="wrapper">
        <!-- Navbar -->
            <Navbar />
        <!-- /.navbar -->

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li class="breadcrumb-item">
                                    <a href="#">Layout</a>
                                </li>
                                <li class="breadcrumb-item active">
                                    Top Navigation
                                </li>
                            </ol>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <h1 class="card-text text-center">Dashboard</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- Main Footer -->
         <Footer />
    </div>
    <!-- ./wrapper -->
</template>

<script>
import Navbar from '../layouts/Navbar.vue';
import Footer from '../layouts/Footer.vue';

export default {
    name: "Dashboard",
    components: {
        Navbar,
        Footer
    }
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
