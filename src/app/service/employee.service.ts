import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private fireservices:AngularFirestore) { }

        

       createEmp(data:any){
        return this.fireservices.collection('Employee').add(data)
       } 

       getEmpList(){
        return this.fireservices.collection('Employee').snapshotChanges();
       }

       update_employee(recordid:any,record:any){
         console.log("Edit is work");
         return this.fireservices.doc('Employee/'+recordid).update(record)
       }

       delete_employee(record_id:any)
       {
            return this.fireservices.doc('Employee/'+record_id).delete()
       }

              
}
