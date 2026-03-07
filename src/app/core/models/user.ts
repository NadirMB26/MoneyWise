export class User {

  private id: string;
  private nombre: string;
  private email: string;
  private password: string;

  constructor(id: string, nombre: string, email: string, password: string) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
  }

  // GETTERS

  public getId(): string {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  // SETTERS

  public setId(id: string): void {
    this.id = id;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}