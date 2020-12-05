import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../interfaces/employee.interface';

const URL = 'http://localhost:8080/employee/';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  public constructor(private http: HttpClient) {}

  public register(input: Employee): Observable<Employee> {
    return  this.http.post<Employee>(URL + 'register' , input);
  }

  public getAllEmployees(): Observable<Employee[]> {
    return  this.http.get<Employee[]>(URL + 'all');
  }
}
