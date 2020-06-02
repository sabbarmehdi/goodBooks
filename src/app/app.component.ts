import { Component } from '@angular/core';
// Execute first: npm install --save firebase
import * as firebase from 'firebase'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQao23SHbR9vLLc6wDNzZLm7YORgg5sGY",
    authDomain: "goodbooks-500d8.firebaseapp.com",
    databaseURL: "https://goodbooks-500d8.firebaseio.com",
    projectId: "goodbooks-500d8",
    storageBucket: "goodbooks-500d8.appspot.com",
    messagingSenderId: "198050854986",
    appId: "1:198050854986:web:71e7f7e6dc94659eb98eb3",
    measurementId: "G-HV8KR8NQXH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
  }
}
