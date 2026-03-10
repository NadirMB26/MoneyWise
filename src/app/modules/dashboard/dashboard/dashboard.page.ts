import { Component, AfterViewInit } from '@angular/core';
import { TransaccionService } from '../../../core/services/transaccion';
import { Transaccion } from '../../../core/models/transaccion';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements AfterViewInit{

  nombreUsuario: string = '';

  totalIngresosMes: number = 0;
  totalGastosMes: number = 0;

  saldo = 0;
  ingresos = 0;
  gastos = 0;

  chart: any;

  constructor(
    private transaccionService: TransaccionService,
    private router: Router,
    private authService: AuthService
  ) {}
ngOnInit(){

  this.authService.usuarioActual$.subscribe(async user => {

    if(!user){
      return;
    }

    this.nombreUsuario = user.nombre;

    await this.cargarDashboard();

  });

}
  async ionViewWillEnter(){

    // obtener usuario actual
    const usuario = await this.authService.getUsuarioActual();

    if(!usuario){
      this.router.navigate(['/auth/login']);
      return;
    }

    this.nombreUsuario = usuario.nombre;

    // obtener transacciones UNA SOLA VEZ
    const transacciones: Transaccion[] =
      await this.transaccionService.getTransaccionesUsuario() || [];

    // calcular datos
    this.calcularResumen(transacciones);
    this.calcularTotalesMes(transacciones);
    this.crearGrafica(transacciones);

  }

  async ngAfterViewInit() {}

  // RESUMEN GENERAL
  calcularResumen(transacciones: Transaccion[]){

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

  // GRAFICA DE GASTOS POR CATEGORIA
  crearGrafica(data: Transaccion[]){

    let categorias: any = {};

    data.forEach(t => {

      if(t.getTipo() === 'gasto'){

        if(!categorias[t.getCategoria()]){
          categorias[t.getCategoria()] = 0;
        }

        categorias[t.getCategoria()] += t.getMonto();

      }

    });

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    if(this.chart){
      this.chart.destroy();
    }

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

  // TOTALES DEL MES
  calcularTotalesMes(transacciones: Transaccion[]) {

    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const anioActual = hoy.getFullYear();

    this.totalIngresosMes = 0;
    this.totalGastosMes = 0;

    transacciones.forEach(t => {

      const fecha = new Date(t.getFecha());

      if(fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual){

        if(t.getTipo() === 'ingreso'){
          this.totalIngresosMes += t.getMonto();
        }

        if(t.getTipo() === 'gasto'){
          this.totalGastosMes += t.getMonto();
        }

      }

    });

  }
async cargarDashboard(){

  const transacciones =
    await this.transaccionService.getTransaccionesUsuario() || [];

  this.calcularResumen(transacciones);
  this.calcularTotalesMes(transacciones);
  this.crearGrafica(transacciones);

}

}