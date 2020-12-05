import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login/login.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Employee} from '../../interfaces/employee.interface';

export const MOCK_EMPLOYEE: Employee = {
  firstName: 'Shivakumar',
  lastName: 'P',
  department: 'IT',
  dob: new Date('1993-12-12'),
  gender: 'Male'
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;
  loginService = jasmine.createSpyObj('LoginService', {
    login: of(MOCK_EMPLOYEE),
  });
  router = jasmine.createSpyObj(['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {provide: LoginService, useValue: loginService},
        {provide: Router, useValue: router}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', () => {
    component.login();
    expect(router.navigate)
      .toHaveBeenCalledWith(['employee']);
  });
});
