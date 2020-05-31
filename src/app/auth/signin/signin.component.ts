import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errormessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(){
    this.initForm();
  }
/**
 * Validators for email and Password
 */
initForm(){
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

/**
 * Determines whether submit on
 */
onSubmit(){
  //effectue les valeur recu par la signUpForm to email, password
  const email = this.signInForm.get('email').value;
  const password = this.signInForm.get('password').value;
  //Call la method createNewUser dans authService
  this.authService.signInUser(email, password).then(
    () => {
      //if tout ce pass bien dérige User à la page des Books
      this.router.navigate(['/books']);
    },
    (error) => {
      //if NON affiché l'error 
      this.errormessage = error;
    }
  )
}
}
