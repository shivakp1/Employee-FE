import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {LoginInput} from '../../interfaces/login.interface';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error?: string;

  public constructor(
    private readonly Login: LoginService,
    private readonly router: Router,
    ) {
    this.loginForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public login(): void {
    const input: LoginInput = {
      userName: this.loginForm.controls.name.value,
      password: this.loginForm.controls.password.value,
    };
    this.Login.login(input).pipe(tap( () => {
    this.router.navigate(['employee']);
    }),
      catchError(
        (error: any) => {
          this.error = error.error.error;
          return EMPTY;
        }
      )).subscribe();
  }

}
