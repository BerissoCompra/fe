import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica-card',
  templateUrl: './estadistica-card.component.html',
  styleUrls: ['./estadistica-card.component.scss']
})
export class EstadisticaCardComponent implements OnInit {

  @Input() valor: any;
  @Input() color: string;
  @Input() descripcion: any;

  constructor() { }


  ngOnInit(): void {
  }

}
