import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;
  constructor(private booksService: BooksService,
              private router: Router) { }

  
  ngOnInit(){
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }
/**
 * Navigate to /books/new 
 */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book){
    this.booksService.removeBook(book);
  }
  /**
   *Navigate to /books/view:id
   * @param id 
   */
  onViewBook(id: number){
    this.router.navigate(['/books', 'view', id]);
  }
  //Destroy Subscription 
  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }
}
