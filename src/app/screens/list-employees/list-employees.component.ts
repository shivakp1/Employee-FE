import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from '../../interfaces/employee.interface';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEmployeesComponent implements OnInit {
  public employeeList: Employee[] = [];

  constructor(private readonly reg: EmployeeService,
              private readonly cdr: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.reg.getAllEmployees().pipe(tap((response: Employee[]) => {
      this.employeeList = response;
      this.cdr.detectChanges();
    })).subscribe();
  }

}
