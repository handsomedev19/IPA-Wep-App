 <!--
  * Author:       Rayan Henchiri
  * File name:    Lehreransicht.vue
  * Version:      1.0
  * Date:         2021
  * Description:  Overview for the teachers. The teachers see all already completed registration forms.
  *               The information can be sorted as desired.
-->

<template>
  <v-container > <!-- v-if="this.$store.state.admin" -->
    <panel title="Übersicht">
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Filtern" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="inhalt" :search="search">
        <template v-slot:items="props">
          <td class="text-xs-left">{{ props.item.Nachname }}</td>
          <td class="text-xs-left">{{ props.item.Vorname }}</td>
          <td class="text-xs-left">{{ props.item.Klassenname }}</td>
        </template>
        <v-alert v-slot: no-results :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </panel>
  </v-container>
</template>

<script>
  import Panel from '@/components/Panel'
  import * as easings from 'vuetify/es5/util/easing-patterns'
  import BackendRequests from '@/api/BackendRequests'

  export default {

    // Defined local variables for this specific component 
    data() {
      return {
        search: [],
        headers: [{
            text: 'Nachname',
            align: 'left',
            sortable: true,
            value: 'Nachname'
          },
          {
            text: 'Vorname',
            align: 'left',
            sortable: true,
            value: 'Vorname'
          },
          {
            text: 'Klasse',
            align: 'left',
            value: 'Klassenname'
          },

        ],
        inhalt: [],
        error: null,
      }
    },

    // All fetched form informations are stored in this array called inhalt
    async mounted(){
      // try {
      //   this.inhalt = (await BackendRequests.getAllForms()).data
      // } catch (err) {
        
      // }
    },
    
    components: {
      Panel
    },

  }
</script>

<style scoped>

</style>
