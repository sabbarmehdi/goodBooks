import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  
  book: Book;
/**
 * Creates an instance of single form component.
 * @param route 
 * @param booksService 
 * @param router 
 */
constructor(private route: ActivatedRoute,
             private booksService: BooksService,
             private router: Router) { }
/**
 * on init
 */
  ngOnInit(){
    //create Empty book to faster the server loading
    this.book = new Book('', '');
    //in as parameter
    const id = this.route.snapshot.params['id'];
    //Call getSingleBook methid from bookService
    this.booksService.getSingleBook(+id).then(
      //if the Book fond
      (book: Book) => {
        //Put this Book in our book instans
        this.book = book;
      }
    );
  }
  onBack(){
    this.router.navigate(['/books']);
  }
}
