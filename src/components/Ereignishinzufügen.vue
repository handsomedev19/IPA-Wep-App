 <!--
  * Author:       Rayan Henchiri
  * File name:    Lehreransicht.vue
  * Version:      1.0
  * Date:         2021
  * Description:  Overview for the teachers. The teachers see all already completed registration forms.
  *               The information can be sorted as desired.
-->

<template>
  <v-container > 
    <panel title="Übersicht">
        <v-layout align-center justify-space-around fill-height>
            <h1 class="font-weight-bold mb-3">
                Ereignisprotokoll
            </h1>
    
            <p class="subheading font-weight-regular">
                Abteilung Informatik
            </p>
    
            <p style="color:red">
                * Pflichtfelder
            </p>
        </v-layout>
     
         <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-container>
                <!-- Select Class, Select Date -->
                <v-layout>
                    <v-flex xs12 md4 >
                        <v-select
                        v-model="selectClass"
                        item-text="NAME_Klasse"
                        item-value="ID_Klasse"
                        :items="classes"
                        :rules="[v => !!v || 'Item is required']"
                        label="Select Class"
                        required
                        return-object
                        persistent-hint
                        v-on:change="onChangeSelectClass(`${selectClass.ID_Klasse}`)"
                        >
                        </v-select>
                    </v-flex>
                    <v-flex xs12 md4 >
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="date"
                                label="Picker in menu"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
                <!-- /Select Class, Select Date -->

                <!-- Select Name -->
                <v-layout>
                    <v-flex xs12 md4 >
                        <v-select
                        v-model="selectLearner"
                        item-text="Vorname"
                        item-value="ID_User"
                        :items="this.$store.state.classMembers"
                        :rules="[v => !!v || 'Item is required']"
                        label="Learner Name"
                        required
                        return-object
                        persistent-hint
                        v-on:change="onChangeSelectClassMember(`${selectLearner.ID_User}`)"
                        ></v-select>
                    </v-flex>

                    <v-flex xs12 md4 >
                        <v-select
                        v-model="select"
                        :items="items"
                        label="Learner First Name"
                        ></v-select>
                    </v-flex>
                </v-layout>
                
                <!-- Event Reasons -->
                <v-layout>
                    <v-flex xs12 md12>
                        <p style="text-align: left">Select an Event</p>
                        <v-radio-group v-model="radioGroup" v-on:change="onChangeSelectEvent()">
                            <v-radio
                                v-for="event in events"
                                :key="event.Grund_ID"
                                :label="event.Name_Grund"
                                :value="event.Grund_ID"
                            ></v-radio>
                        </v-radio-group>
                    </v-flex>
                </v-layout>
                <!-- /Event Reasons -->

                <!-- Other, namely -->
                <v-layout>
                    <v-flex xs12 md4 >
                        <v-text-field
                        v-model="other"
                        :counter="50"
                        :rules="otherRules"
                        label="Other, namely"
                        required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <!-- /Other, namely -->
                
                <!-- Remark, Mesuares -->
                <v-layout>

                    <v-flex xs12 md4 >
                        <v-text-field
                        v-model="remark"
                        :counter="50"
                        :rules="remarkRules"
                        label="Remark"
                        required
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md4 >
                        <v-text-field
                        v-model="mesuares"
                        :counter="50"
                        :rules="mesuaresRules"
                        label="Measures (must be recorded)"
                        required
                        ></v-text-field>
                    </v-flex>

                </v-layout>
                <!-- /Remark, Mesuares -->

                <v-checkbox
                v-model="checkbox"
                label="Round table desired (KLP / AL, LP, LE)"
                required
                @change="onChangeCheckBox()"
                ></v-checkbox>

                <div v-html="error">{{error}}</div>

                <v-btn
                :disabled="!valid"
                color="success"
                @click="submit"
                >
                Submit
                </v-btn>

                <v-btn
                color="error"
                @click="reset"
                >
                Reset Form
                </v-btn>

                <!-- <v-btn
                color="warning"
                @click="resetValidation"
                >
                Reset Validation
                </v-btn> -->
                
            </v-container>
        </v-form>

            
        
       
    </panel>
  </v-container>
</template>

<script>
  import Panel from '@/components/Panel'
  import * as easings from 'vuetify/es5/util/easing-patterns'
  import BackendRequests from '@/api/BackendRequests'

  export default {

    // Defined local variables for this specific component 
    data: () => ({
      valid: true,
      select: null,
      items: [],
      checkbox: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      error: '',
      selectClass: null,
      classes: [],
      selectLearner: null,
      learners: [],
      learnerId: null,
      selectEvent: {},
      events: [],
      eventId: null,
      radioGroup: 1,
      other: '',
      otherRules: [
        v => !v || v.length <= 50 || 'Other, Namely must be less than 50 characters'    
      ],
      mesuares: '',
      mesuaresRules: [
        v => !!v || 'Mesuares is required',
        v => (v && v.length <= 50) || 'Mesuares must be less than 50 characters'
      ],
      remark: '',
      remarkRules: [
        v => !v || v.length <= 50 || 'Remark must be less than 50 characters'   
      ],
    }),

    methods: {
      async submit () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }

        let formular = {
            Lehrperson_ID: this.$store.state.user.ID_User,
            Lernender_ID: this.learnerId,
            Grund_ID: this.radioGroup,
            Zeitstempel_Erstellt: this.date,
            Gespraech_Lehrperson: this.checkbox ? 1 : 0,
            Andere: this.other,
            Bemerkungen: this.remark,
            Maße: this.mesuares
        }
        //console.log(formular);

        try {
            let res = await BackendRequests.postEvents(formular)
            //console.log(res.data);
            this.reset();
        } catch (err) {
            //console.log(err);
            this.error = 'Daten konnten nicht aus der Datenbank abgerufen werden.'
        }


      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async onChangeSelectClass(ID_Class) {
            //console.log(ID_Class);
            try {
                let res = await BackendRequests.getClassMembers(ID_Class);
                //console.log(res.data.classMembers);
                this.$store.dispatch('setClassMembers', res.data.classMembers)
            } catch (err) {
                //console.log(err);
                this.error = 'Daten konnten nicht aus der Datenbank abgerufen werden.'
            }
        },

        onChangeSelectClassMember(ID_User) {
            //console.log("user id");
            //console.log(ID_User);
            this.learnerId = ID_User;
        },

        onChangeSelectEvent() {
            //console.log(this.radioGroup);
        },

        onChangeCheckBox() {
            //console.log(this.checkbox);
        }
    },

    // All fetched form informations are stored in this array called inhalt
    async mounted(){
        try {
            let res = await BackendRequests.getClasses();
            //console.log(res.data.classes);
            this.classes = res.data.classes;
            //console.log(this.classes);

            res = await BackendRequests.getEvents();
            //console.log(res.data.events);
            this.events = res.data.events;
            //console.log("events");
            //console.log(this.events);
        } catch (err) {
            //console.log(err);
            this.error = 'Daten konnten nicht aus der Datenbank abgerufen werden.'
        }
    },
    
    components: {
      Panel
    },

  }
</script>

<style scoped>

</style>