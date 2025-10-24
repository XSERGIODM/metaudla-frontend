export interface UsuarioResponseType {
  usuario: UsuarioType;
}

export interface LoginRequestType {
  usernameOrEmail: string,
  contrasena: string
}

export interface LoginResponseType {
  usuario: UsuarioType,
  token: string
}

export interface UsuarioCreateType {
  nombre: string;
  username: string;
  correo: string;
  contrasena: string;
}


export interface UsuarioType {
  estado:       string;
  islas:        any[];
  puntuaciones: any[];
  nombre:       string;
  rol:          string;
  createdAt:    Date;
  correo:       string;
  favoritos:    any[];
  id:           number;
  meGustas:     any[];
  username:     string;
}
