import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /**
 * Creates new user to firebase
 * @param email 
 * @param password 
 * @returns  Connect or resignIn
 */
createNewUser(email: string, password: string){
  return new Promise(
    (resolve,reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
/**
 * Signin user to firebase
 * @param email 
 * @param password 
 * @returns  
 */
signInUser(email: string, password: string){
  return new Promise(
    (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}

/**
 * Signs out user
 */
signOutUser(){
    firebase.auth().signOut();
  }
}
