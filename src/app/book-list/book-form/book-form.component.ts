import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  fileisUploading = false;
  fileUrl: string;
  fileupLoaded = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private booksService: BooksService) { }

  ngOnInit() {
    this.initForm();
  }
  //Form validation
  initForm(){
   this.bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    synopsis: ''
   });
  }
  onSaveBook(){
    //get title value from form
    const title = this.bookForm.get('title').value;
    //get author value from form
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    //effectue title and author to the NewBook
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;

    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl;
    }
    //sent this 
    this.booksService.creatNewBook(newBook);
    //this.router.navigate(['/books']);
  }
/**
 * Determines whether uploadfile on
 * @param file 
 */
onUploadfile(file: File){
    this.fileisUploading = true;
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileisUploading = false;
        this.fileupLoaded = true;
      }
    )
  }
/**
 * Deletes files
 * @param event 
 */
deleteFiles(event){
    this.onUploadfile(event.target.files[0]);
  }
}
