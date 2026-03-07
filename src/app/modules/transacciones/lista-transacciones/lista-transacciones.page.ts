import { Component, OnInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.page.html',
  styleUrls: ['./lista-transacciones.page.scss'],
  standalone: false,
})
export class ListaTransaccionesPage implements OnInit {

  transacciones: Transaccion[] = [];

  constructor(
    private transaccionService: TransaccionService
  ) {}

  ngOnInit() {
    this.cargarTransacciones();
  }

  cargarTransacciones(){

    let data = this.transaccionService.getTransacciones() || [];

    this.transacciones = data.map((t:any)=>
      new Transaccion(
        t.id,
        t.tipo,
        t.categoria,
        new Date(t.fecha),
        t.monto,
        t.descripcion,
        t.comprobante
      )
    );

  }

}