import { Component, OnInit } from '@angular/core';
import { Input,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// import { ServiceSignalR } from '../_services/ServiceSignalR';
import { ChatHubService } from '../_services/chat-hub.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginModel: any = {};
  registerModel: any = {};
  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private serviceSignalR: ChatHubService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);

      this.authService.login(this.loginModel).subscribe(response => {
        // this.serviceSignalR.startConnection();
        console.log('Logged in successfully');
      }, error => {
        console.log('Failed to login');
      })
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  ngOnInit() {
  }

  register(){
    if (!this.registerForm.valid) {
      return;
    }
    this.authService.register(this.registerModel).subscribe(() => {
      console.log('registration successfull');
    }, error => {
      console.log(error);
    })
  }

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  loggedin(){
    return this.authService.loggedin();
  }
}
