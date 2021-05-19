<!--
  * Author:       Rayan Henchiri
  * File name:    Ereignisprotokoll.vue
  * Version:      1.0
  * Date:         2021
  * Description:  The registration form for the apprentices is summerized and 
  *			          sent to the backend.
-->

<template>
    <v-container v-if="this.$store.state.loggedIn">
        <panel title="Ereignisprotokoll">
            <v-layout align-center justify-space-around row fill-height>
                <v-flex xs12 sm5>
                    <v-text-field label="Vorname" disabled v-model="formular.vorname">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm5>
                    <v-text-field label="Nachname" disabled v-model="formular.nachname">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-space-around row fill-height>
                <v-flex xs12 sm5>
                    <v-text-field label="Klasse" disabled v-model="formular.klasse">
                    </v-text-field>
                </v-flex>
                
            </v-layout>
            <div>
                <div v-html="error"></div>
                <v-btn dark style="background-color:#0382b5" class="darken-2" @click="submit" v-if="!existingForm">Bestätigen
                </v-btn>
            </div>
            <br>
            <v-hover>
                <v-card-text class="pt-1" style="position: relative">
                    <v-expand-transition>
                        <div v-if="isOpen" style="height: 100%; position: relative">
                            <h3 class="text-sm-left">Wichtige Hinweise:</h3>
                            <p class="text-sm-left">
                                Lorem Ipsum
                            </p>
                            <p class="text-sm-left">
                                Lorem Ipsum
                            </p>
                            <p class="text-sm-left">
                                Lorem Ipsum
                            </p>
                        </div>
                    </v-expand-transition>
                    <v-btn color="#0382b5" @click="onClick()" dark absolute large right top>
                        <i class="material-icons">info</i>
                    </v-btn>
                </v-card-text>
            </v-hover>

            <div>
                <v-toolbar flat color="white">
                <v-toolbar-title>Event Logs</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                    </template>
                    <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.learnerName" label="Dessert name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.NAME_Klasse" label="Calories"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.teacherName" label="Fat (g)"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md8>
                            <v-text-field v-model="editedItem.Name_Grund" label="Carbs (g)"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.Zeitstempel_Erstellt" label="Protein (g)"></v-text-field>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-toolbar>
                <v-data-table
                :headers="headers"
                :items="eventLogs"
                class="elevation-1"
                >
                <template v-slot:items="props">
                    <td>{{ props.item.learnerName }}</td>
                    <td class="text-xs-left">{{ props.item.NAME_Klasse }}</td>
                    <td class="text-xs-left">{{ props.item.teacherName }}</td>
                    <td class="text-xs-left">{{ props.item.Name_Grund }}</td>
                    <td class="text-xs-left">{{ props.item.Zeitstempel_Erstellt }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                    </td>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
                </v-data-table>
            </div>

        </panel>
    </v-container>
</template>

<script>
import Panel from '@/components/Panel'
import * as easings from 'vuetify/es5/util/easing-patterns'
import BackendRequests from '@/api/BackendRequests'
import Login from './Login.vue';

export default {
    data() {
        return {
            formular: {
                vorname: this.$store.state.user.Vorname,
                nachname: this.$store.state.user.Nachname,
                klasse: this.$store.state.user.Klassenname,
                lernenderID: this.$store.state.user.ID_User
            },
            ereignisprotokolle: [],
            error: null,
            required: (value) => !!value || 'Ausfüllen',
            existingForm: [],
            isOpen: false,
            dialog: false,
            eventLogs: [],
            headers: [
                {
                text: 'Learner',
                align: 'left',
                // sortable: false,
                value: 'learnerName'
                },
                { text: 'Class', value: 'NAME_Klasse' },
                { text: 'Teacher', value: 'teacherName' },
                { text: 'Event', value: 'Name_Grund' },
                { text: 'Signed Date', value: 'Zeitstempel_Erstellt' },
                { text: 'Actions', value: 'name', sortable: false }
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
        }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {

      initialize () {
        
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

        // Send the form to the backend when all required fields have been completed
        async submit() {
            this.error = null
            // Is used to compare if something is an object
            const areAllFieldsFilledIn = Object
                .keys(this.formular)
                .every(key => !!this.formular[key])

            if (!areAllFieldsFilledIn) {
                this.error = 'Bitte alle benötigten Felder ausfüllen.'
                return
            }

            try {
                let res = await BackendRequests.postForm(this.formular)
                this.$router.go()
            } catch (err) {
                this.error = err.response.data.error;
            }

        },
        // This is a function for a button 
        onClick() {
            if (this.isOpen === true) {
                this.isOpen = false
            } else {
                this.isOpen = true
            }
        },

    },

    // Get the required information from the backend and paste it into an array
    async mounted() {
        // try {
        //     this.existingForm = (await BackendRequests.getForm(this.formular.userID)).data

        //     this.ereignisprotokolle = (await BackendRequests.getEreignisprotokolle()).data.ereignisprotokolle
        // } catch (err) {
        //     this.error = 'Daten konnten nicht aus der Datenbank abgerufen werden.'
        // }

        // // If form already exists toggle form view to read only 
        // if (this.existingForm.length == 0) {
        //     this.existingForm = false;
        // }

        let res = await BackendRequests.getEventLogs()
        console.log(res.data.eventLogs);
        this.eventLogs = res.data.eventLogs;

        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
          }
        ]

    },

    components: {
        Panel
    },
}
</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .7;
    position: absolute;
    width: 100%;
}
</style>
