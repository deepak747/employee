import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../service/employee.service';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal]
})

export class HomeComponent implements OnInit {

  empForm!: FormGroup;
  dataSource: [] = [];
  data: any;
  employeeList: any;
  empList: any[] = [];
  storedata: any = []
  storeList: [] = [];
  employee: any;
  editId: any;
  formData: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  constructor(private employeeService: EmployeeService, config: NgbModalConfig,
    private modalService: NgbModal, private fb: FormBuilder,private toastr: ToastrService,
    private ngxService: NgxUiLoaderService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
     this.ngxService.start();
    this.employeeService.getEmpList().subscribe((data: any) => {

      this.employee = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          email: e.payload.doc.data()["email"],
          name: e.payload.doc.data()['name'],
        };
      })
      console.log(this.employee);
    })
    setTimeout(() => {
      this.ngxService.stop();
    }, 500);
     
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  open(content: any) {
    this.modalService.open(content);
    this.empForm.reset()
  }

  onSubmit() {
    
    this.ngxService.start();
      this.data = this.employeeService.createEmp(this.empForm.value)
      this.toastr.success("Record Added Sucessfull...")           
      this.formData = this.empForm.value
      setTimeout(() => {
        this.ngxService.stop(); 
      }, 500);
  }

  editRecourd(content_edit: any, data: any) {
    this.editId = data?.id;
    this.modalService.open(content_edit);
    this.empForm.patchValue({
      name: data?.name,
      email: data?.email
    })
  }
 

  saveRecourd() {
    this.ngxService.start();
    this.employeeService.update_employee(this.editId, this.empForm.value)
    this.toastr.success("Record Update Sucessfull...")
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 500);
  }


  deleteRecourd(id: any) {
    this.ngxService.start();
    this.employeeService.delete_employee(id);
    this.toastr.error("Record Deleted Sucessfull...")
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 500);

  }

}
