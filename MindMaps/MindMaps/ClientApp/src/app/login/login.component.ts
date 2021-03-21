import { Component, OnInit } from '@angular/core';
import { Input,  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginModel: any = {};
  registerModel: any = {};
  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);

      this.authService.login(this.loginModel).subscribe(response => {
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
    this.authService.register(this.registerModel).subscribe(() => {
      console.log('registration successfull');
    }, error => {
      console.log(error);
    })
  }

}
