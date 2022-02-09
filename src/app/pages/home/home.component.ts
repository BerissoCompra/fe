import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private accountService: AccountService, private comercioService: ComercioService ,private router: Router) { }
  comercio: Comercio;
  fechaHoy: Date = new Date();
  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .subscribe((res)=>{
      this.comercioService.comercio = res;
      this.comercio = this.comercioService.comercio;
    })
  }
}
