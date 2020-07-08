import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() dtOptions: any;
  @Output() api = new EventEmitter<any>();
  @Input() data;
  dataTable: any;
  dtTrigger = new Subject();
  dtInstance: DataTables.Api;

  @ViewChild(DataTableDirective, { static: false })
  private datatableElement: DataTableDirective;
  constructor() { }

  ngOnInit() {
    const defaultDtOptions = {
      dom: "<f<t>ip>"
    }

    Object.assign(this.dtOptions, defaultDtOptions);
  }



  ngAfterViewInit() {
    this.dtTrigger.next();

    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtInstance = dtInstance;
      // dtInstance.destroy();
      this.api.emit(dtInstance);
    });

  }

  ngOnChanges(a) {
    if ((a.data && !(a.data.firstChange))) {
      this.dtInstance.clear();
      this.dtInstance.rows.add(this.dtOptions.data);
      this.dtInstance.draw();
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
