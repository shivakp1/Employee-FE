import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from '../registration/registration.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EmployeeService} from '../../services/employee.service';
import {of} from 'rxjs';
import {MOCK_EMPLOYEE} from '../login/login.component.spec';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registrationService: EmployeeService;
  registrationService = jasmine.createSpyObj('RegistrationService', {
    register: of(MOCK_EMPLOYEE),
  });
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {provide: EmployeeService, useValue: registrationService}
    ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register', () => {
    component.registrationForm.controls.firstName.setValue('Shivakumar');
    component.registrationForm.controls.lastName.setValue('P');
    component.registrationForm.controls.gender.setValue('Male');
    component.registrationForm.controls.department.setValue('IT');
    component.registrationForm.controls.dob.setValue(new Date('1993-12-12'));
    component.registerData();
    expect(registrationService.register).toHaveBeenCalledWith(MOCK_EMPLOYEE);
  });
});
