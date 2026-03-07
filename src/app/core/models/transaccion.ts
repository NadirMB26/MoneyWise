export class Transaccion {

  private id: string;
  private tipo: 'ingreso' | 'gasto';
  private categoria: string;
  private fecha: Date;
  private monto: number;
  private descripcion?: string;
  private comprobante?: string;

  constructor(
    id: string,
    tipo: 'ingreso' | 'gasto',
    categoria: string,
    fecha: Date,
    monto: number,
    descripcion?: string,
    comprobante?: string
  ) {
    this.id = id;
    this.tipo = tipo;
    this.categoria = categoria;
    this.fecha = fecha;
    this.monto = monto;
    this.descripcion = descripcion;
    this.comprobante = comprobante;
  }

  // GETTERS

  public getId(): string {
    return this.id;
  }

  public getTipo(): 'ingreso' | 'gasto' {
    return this.tipo;
  }

  public getCategoria(): string {
    return this.categoria;
  }

  public getFecha(): Date {
    return this.fecha;
  }

  public getMonto(): number {
    return this.monto;
  }

  public getDescripcion(): string | undefined {
    return this.descripcion;
  }

  public getComprobante(): string | undefined {
    return this.comprobante;
  }

  // SETTERS

  public setTipo(tipo: 'ingreso' | 'gasto'): void {
    this.tipo = tipo;
  }

  public setCategoria(categoria: string): void {
    this.categoria = categoria;
  }

  public setFecha(fecha: Date): void {
    this.fecha = fecha;
  }

  public setMonto(monto: number): void {
    this.monto = monto;
  }

  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public setComprobante(comprobante: string): void {
    this.comprobante = comprobante;
  }
}