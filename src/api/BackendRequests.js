/**
* Author:       Rayan Henchiri
* File name:    BackendRequests.js
* Version:      1.0
* Date:         2021
* Description:  Sends data to the backend.
*/

//Imports BackendConnection.js
import conn from '@/api/BackendConnection'

export default {

  // User Authentication
  login(data) {
    // return conn().post('login', data, { headers: {
    //   'Content-type': 'application/x-www-form-urlencoded',
    //   }
    // })
    return conn().post('login', data)
  },

  // Get Ereignisprotokolle
  getEreignisprotokolle() {
    return conn().get('ereignisprotokolle')
  },

  // Get entry from specific user
  getForm(userId) {
    return conn().get(`form/${userId}`)
  },

  // Get all entries
  getAllForms() {
    return conn().get('allForms')
  },

  // create entry
  postForm(userId, form) {
    return conn().post('register', userId, form)
  },

  // Get classes
  getClasses() {
    return conn().get('classes')
  },

  // Get Class Members
  getClassMembers(classId){
    return conn().get(`classMembers/${classId}`)
  },

  // Get Events
  getEvents(){
    return conn().get('events')
  },

  // Post Events
  postEvents(form){
    return conn().post('events', form)
  },

  // Get Event Logs
  getEventLogs() {
    return conn().get('eventLogs')
  }

}
