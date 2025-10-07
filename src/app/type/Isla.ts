export interface Isla {
  id:                       number;
  nombre:                   string;
  descripcion:              string;
  imagenes:                 string[];
  videos:                   string[];
  linkDescarga:             string;
  autorId:                  number;
  autorNombre:              AutorNombre;
  autorCorreo:              AutorCorreo;
  autorFotoPerfilUrl:       string;
  autorRol:                 AutorRol;
  etiquetas:                Etiqueta[];
  visitas:                  number;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  version:                  number;
  categorias:               any[];
  favoritoIds:              any[];
  puntuacioneCalificacions: number[];
  meGustaTipos:             MeGustaTipo[];
  estado:                   Estado;
}

export enum AutorCorreo {
  Admin1UdlaEduEc = "admin1@udla.edu.ec",
}

export enum AutorNombre {
  AdministradorDelSistema = "Administrador del Sistema",
}

export enum AutorRol {
  Administrador = "ADMINISTRADOR",
}

export enum Estado {
  Habilitado = "HABILITADO",
}

export enum Etiqueta {
  Cálculo = "cálculo",
  Geometría = "geometría",
  Matemáticas = "matemáticas",
  Álgebra = "álgebra",
}

export enum MeGustaTipo {
  MeGusta = "ME_GUSTA",
}
