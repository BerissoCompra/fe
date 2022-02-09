export interface UserLogin {
  email: string;
  password: string;
}

export interface UserReg{
  nombre: string;
  nombreElegido: string;
  apellido: string;

  email: string;
  password: string;
  repassword: string;
  emailActivado: boolean;
  terminos: boolean;
}


export interface UserLoginRegister {
  nombre: string;
  nombreElegido: string;
  apellido: string;

  email: string;
  password: string;
  emailActivado: boolean;
  terminos: boolean;
}

export interface Usuario{
  _id?: string,
  nombre: string;
  nombreElegido: string;
  apellido: string;

  email: string;
  password: string;
  repassword: string;
  emailActivado: boolean;
  terminos: boolean;
}
