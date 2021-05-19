<!--
  * Author:       Rayan Henchiri
  * File name:    App.js
  * Version:      1.0
  * Date:         2021
  * Description:  This is the main File of the Components.
-->

<template>
    <div id="app">
        <v-app>
            <!-- Imports Material Design Icons -->
            <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
            <!-- Imports Material Design Icons aswell -->
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
            <!-- Imports Font -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
            <!-- Uses the Header Componend that was impported in the script tag as a default header for all pages/routes-->
            <page-header />
    
            <main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </main>
        </v-app>
    </div>
</template>

<script>
/** Imports the Header Component*/
import PageHeader from '@/components/Header.vue'
export default {
    name: 'app',
    components: {
        PageHeader
    }
}
</script>

<style>
#app {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.danger-alert {
    color: red;
}
</style>
