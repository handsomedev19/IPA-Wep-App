/**
* Author:       Rayan Henchiri
* File name:    store.js
* Version:      1.0
* Date:         2021
* Description:  All global informations provided to the components is stored here.
*/

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [

    // Stores all vuex states in the browsers local storage
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    loggedIn: false,
    admin: false,
    classMembers: []
  },
  mutations: {

    // If the user has a token, the status is set to loggedin
    setToken (state, token) {
      state.token = token
      if (token){
          state.loggedIn = true
      }else{
          state.loggedIn = false
      }
    },

    // Sets the role for the admin based on the role
    setUser (state, user) {
      console.log(user);
      state.user = user
      if(!user){
          state.admin = false
      }else if(user.Rolle === 'DL_Test_LP'){
          state.admin = true
      }else{
          state.admin = false
      }
    },

    // Sets classMembers for selection.
    setClassMembers (state, classMembers){
      if (!!classMembers) {
        state.classMembers = classMembers;
      }
    }
  },
  actions: {

    // Global function to set the token
    setToken({
      commit
    }, token) {
      commit('setToken', token)
    },
    
    // Global function to set the user
    setUser({
      commit
    }, user) {
      commit('setUser', user)
    },

    // Global function to set the classMembers
    setClassMembers({
      commit
    }, classMembers) {
      commit('setClassMembers', classMembers)
    }

  }
})

