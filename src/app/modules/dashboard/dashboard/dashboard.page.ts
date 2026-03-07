import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, AfterViewInit {

  saldo = 0;
  ingresos = 0;
  gastos = 0;

  chart: any;

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit() {
    this.calcularResumen();
  }

  ngAfterViewInit() {
    this.crearGrafica();
  }

  calcularResumen(){

    let data = this.transaccionService.getTransacciones() || [];

    let transacciones: Transaccion[] = data.map((t:any)=>
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

    this.ingresos = 0;
    this.gastos = 0;

    transacciones.forEach(t => {

      if(t.getTipo() === 'ingreso'){
        this.ingresos += t.getMonto();
      }

      if(t.getTipo() === 'gasto'){
        this.gastos += t.getMonto();
      }

    });

    this.saldo = this.ingresos - this.gastos;

  }

  crearGrafica(){

    let data = this.transaccionService.getTransacciones() || [];

    let categorias: any = {};

    data.forEach((t:any)=>{

      if(t.tipo === 'gasto'){

        if(!categorias[t.categoria]){
          categorias[t.categoria] = 0;
        }

        categorias[t.categoria] += t.monto;

      }

    });

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    this.chart = new Chart("graficaPastel", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: valores
        }]
      }
    });

  }

}