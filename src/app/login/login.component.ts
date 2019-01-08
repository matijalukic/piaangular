import {Component, OnInit, Input, NgModule} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { User } from '../user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() user: User;

  form: FormGroup;

  submited = false;
  error: string = null;


	constructor(private userService: UserService,
				private router: Router,
				private formBuilder: FormBuilder) {
	
		userService.getUser.subscribe(
		(loggedUser: User) => {
			this.user = loggedUser;
		},
		(err) => {
			this.error = err.error.error;
		});
	}

  	ngOnInit() {
	  	this.error = '';
		this.form = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', [Validators.required]]
		});
	}
	  
	get f() {
		return this.form.controls;
	}

  private loggedIn(): boolean {
    return this.userService.isLogged();
  }


  login() {
	  this.submited = true;
	  if (this.form.invalid){
		return;
	  }
      // if user is already logged in
      if (this.user) {
          this.router.navigate(['/home']);
      }

      // perform login
      this.userService.login(this.f.username.value, this.f.password.value)
        .subscribe(
			(response) => {
				// redirection to the home page
				this.router.navigate(['/home']);
			},
			(thrownError) => {
				this.error = thrownError.error.error;
			}
        );

  }

}
