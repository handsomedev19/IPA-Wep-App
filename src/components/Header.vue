<!--
  * Author:       Rayan Henchiri
  * File name:    Header.vue
  * Version:      1.0
  * Date:         2021
  * Description:  Creates the header for the app.vue component and includes some links.
-->

<template>
    <v-toolbar color="#0382b5" class="darken-3" fixed dark>
        <div class="d-flex align-center">
            <v-img alt="TFBern Logo" class="shrink mr-2" contain src="https://backend.werbewoche.ch/sites/default/files/Teaser-t-f.jpg" transition="scale-transition" width="40" />
        </div>
        <h2 class="mr-2" style="margin-left:1%">Technische Fachschule Bern</h2>
        <v-toolbar-items>
            <v-btn flat style="margin-left:25%" class="light-blue darken-3" dark :to="{
              name: 'info'
            }">
                Infos
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn v-if="$store.state.loggedIn && !this.$store.state.admin" class="light-blue darken-3" flat dark :to="{
              name: 'ereignisprotokoll'
            }">
                Ereignisprotokoll
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn v-if="this.$store.state.admin" class="light-blue darken-3" flat dark :to="{
              name: 'lehreransicht'
            }">
                Lehreransicht
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
            <v-btn class="light-blue darken-3" flat dark :to="{
              name: 'Ereignishinzufügen'
            }">
                Ereignis hinzufügen
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="light-blue darken-3">
            <v-btn v-if="!$store.state.loggedIn" flat dark :to="{
              name: 'login'
            }">
                Login
            </v-btn>
            <v-btn v-if="$store.state.loggedIn" flat dark @click="logout">
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    methods: {
        // When logout is clicked, the token and the user are set to null and you will be redirected to the login page
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}
</style>
