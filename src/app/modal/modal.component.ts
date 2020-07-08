import { Component, ViewChild, OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DataService } from "../data.service";
import { Data } from '../data';
// import * as $ from 'jquery';
// import 'datatables.net';
// import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  title = 'Angular CRUD';
  // @ViewChild(DataTableDirective, { static: false })
  // dtElement: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger: Subject<boolean> = new Subject();

  @ViewChild('modalComponent', { static: false }) modalComponent;
  modalRef: BsModalRef;
  userForm: FormGroup;
  datas: Data[];
  modalTitle: string;
  dtOptions: any;

  constructor(private modal: BsModalService, private fb: FormBuilder, private DataService: DataService) { }

  ngOnInit() {

    this.dtOptions = {
      retrieve: true,
      destroy: true,
      dom: '<<t>ip>',
      columns: [
        { title: "ID", data: 'id', visible: false },
        { title: "Employee Name", data: 'emp_Name' },
        { title: "Department", data: 'dept_Name' },
        { title: "Organization", data: 'org_Name' },
        { title: "Age", data: 'age' },
        { title: "Salary", data: 'salary' },
        { title: "Edit", data: 'id' },
        { title: "Delete", data: 'id' }
      ],
      columnDefs: [
        {
          targets: [4, 5],
          className: 'dt-head-center'
        },
        {
          targets: [1, 2, 3],
          render: $.fn.dataTable.render.text(),
          className: 'dt-center'
        },
        {
          targets: 5,
          render: $.fn.dataTable.render.number(',', '.', 2, '$')
        },
        {
          targets: 6,
          render: (data, type, row) => {
            return `<span>\
            <button class="edit btn btn-primary">Edit</button>\
            </span>`;
          },
          createdCell: (nTd, sData, oData, iRow, iCol) => {
            let that = this
            $(nTd).find('.edit').on("click", function () {
              console.log("click", oData);
              that.openModal(oData);
            })
          }
        },
        {
          targets: 7,
          render: (data, type, row) => {
            return `<span>\
            <button class="edit btn btn-danger">Delete</button>\
            </span>`;
          },
          createdCell: (nTd, sData, oData, iRow, iCol) => {
            let that = this
            $(nTd).find('.edit').on("click", function () {
              console.log("click", sData);
              that.delete(oData);
            })

          }
        }
      ]
    };

    this.userForm = new FormGroup({
      'id': new FormControl(null),
      'emp_Name': new FormControl(null, Validators.required),
      'org_Name': new FormControl(null),
      'dept_Name': new FormControl(null),
      'age': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'salary': new FormControl(null, Validators.required)
    });

    this.getData();
  }

  getData() {
    this.DataService.getData()
      .subscribe((data: any[]) => {
        console.log(data);
        this.dtOptions.data = data;
        // this.reRender();
        this.userForm.reset();
      })
  }

  openModal(user) {
    this.modalTitle = "Add User"
    this.modalRef = this.modal.show(this.modalComponent, {
      initialState: { user },
      animated: true,
      backdrop: 'static'
    });

    if (user) {
      this.modalTitle = "Edit User"
      this.userForm.setValue(user);
    }

  }

  onSubmit() {

    if (this.userForm.value.id) {
      this.DataService.updateUser(this.userForm.value as Data)
        .subscribe(() => {
          this.getData();
          this.userForm.reset();
          this.modalRef.hide();
        });
    }
    else {
      this.DataService.addUser(this.userForm.value as Data[])
        .subscribe((item: any[]) => {
          // this.dtOptions.data.push(item);
          // this.reRender();
          this.getData();
          this.userForm.reset();
          this.modalRef.hide();
        });
    }
  }

  delete(data: Data) {
    this.dtOptions.data = this.dtOptions.data.filter(x => x !== data);
    this.DataService.deleteUser(data).subscribe(() => {
      // this.reRender();
    });
  }

  // reRender() {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     dtInstance.destroy();
  //     this.dtTrigger.next();
  //   });
  //   this.userForm.reset();
  // }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  // ngOnDestroy(): void {
  //   // this.DataService.unsubscribe();
  //   this.dtTrigger.unsubscribe();
  // }

}
