export interface UserLogin {
  email: string;
  password: string;
}

export interface UserReg{
  email: string;
  password: string;
  nombre: string;
}


export interface UserLoginRegister {
  email: string;
  password: string;
  repassword: string;
  nombre: string;
  terminos: boolean;
}

export interface Usuario{
  id: string,
  nombre: string,
  apellido: string,
}
