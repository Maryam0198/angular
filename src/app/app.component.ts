import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {

  @ViewChild('modalComponent', { static: false }) modalComponent;
  modalRef: BsModalRef;

  constructor(private modal: BsModalService) { }

}
