import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../interfaces/employee.interface';
import {EmployeeService} from '../../services/employee.service';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public response?: Employee;
  public error?: any;
  public registrationForm: FormGroup;

  constructor(private readonly register: EmployeeService) {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }

  public registerData(): void {
    this.response = undefined;
    this.error = undefined;
    const input: Employee = {
      firstName: this.registrationForm.controls.firstName.value,
      lastName: this.registrationForm.controls.lastName.value,
      gender: this.registrationForm.controls.gender.value,
    department: this.registrationForm.controls.department.value,
    dob: this.registrationForm.controls.dob.value
    };
    this.register.register(input).
    pipe(tap((response) => {
      this.response = response;
      this.registrationForm.reset();
    }),
      catchError(
        (error: any) => {
          this.error = error.error.error;
          return EMPTY;
        }
      )).
    subscribe();
  }
}
