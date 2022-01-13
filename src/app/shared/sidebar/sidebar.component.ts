import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{


  constructor(private accountService: AccountService, private comercioService: ComercioService,
  private router: Router) {
  }

  ngOnInit(): void {

  }

  cerrarSesion(){
    this.accountService.cerrarSesion();
  }
}
