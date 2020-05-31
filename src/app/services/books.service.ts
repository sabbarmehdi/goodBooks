import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';




@Injectable({
  providedIn: 'root'
})
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
}
