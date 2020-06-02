import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { 
    this.getBooks
  }
/**
 * Emit books
 */
emitBooks(){
    this.booksSubject.next(this.books);
  }
/**
 * Save books to Firebase
 * 
 */
savebooks(){
  //set()  fonctionne comme  put()  pour le HTTP: create and 
  //update database
  firebase.database().ref('/books').set(this.books);
}
/**
 * Gets books
 */
getBooks(){
  firebase.database().ref('/books')
  //data: : de type DataSnapshot
  .on('value', (data) => {
    this.books = data.val() ? data.val() : [];
    this.emitBooks();
  }
  );
}
/**
 * Get single book
 * @param id 
 * @returns  
 */
getSingleBook(id: number){
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
/**
 * Create new book
 * @param newBook 
 */
creatNewBook(newBook: Book){
  this.books.push(newBook);
  this.savebooks;
  this.emitBooks;
}
/**
 * Remove book by Id
 * @param book 
 */
removeBook(book: Book){
  if(book.photo){
    const storageRef  = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Picture Deleted !');
      }
    ).catch(
      (error) => {
        console.log('File not found : ' + error);
      }
    );
  }
  //Find element by Id
  const bookIndexRemove = this.books.findIndex(
    (bookElment) => {
      if(bookElment === book){
        return true;
      }
    }
  );
  //remove this Element
  this.books.splice(bookIndexRemove, 1);
  this.savebooks();
  this.emitBooks();
}
/**
 * Uploads file
 * @param file 
 * @returns  
 */
uploadFile(file: File){
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=> {
            console.log('Changement...');
          },
          (error) => {
            console.log('Erreur de changement ! :' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          );
    }
  );
}
}
