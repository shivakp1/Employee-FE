import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginInput} from '../interfaces/login.interface';

const URL = 'http://localhost:8080/employee/';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public constructor(private http: HttpClient) {}

  public login(input: LoginInput): Observable<{}> {
   return  this.http.post(URL + 'login' , input);
  }
}
