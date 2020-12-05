import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeesComponent } from '../list-employees/list-employees.component';
import {EmployeeService} from '../../services/employee.service';
import {of} from 'rxjs';
import {MOCK_EMPLOYEE} from '../login/login.component.spec';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('ListEmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;
  let registrationService: EmployeeService;
  registrationService = jasmine.createSpyObj('RegistrationService', {
    getAllEmployees: of([MOCK_EMPLOYEE]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesComponent ],
      imports: [HttpClientModule],
      providers: [
        HttpClient,
        {provide: EmployeeService, useValue: registrationService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and call get all employee', () => {
    expect(component).toBeTruthy();
    expect(registrationService.getAllEmployees).toHaveBeenCalled();
    expect(component.employeeList).toEqual([MOCK_EMPLOYEE]);
  });
});
