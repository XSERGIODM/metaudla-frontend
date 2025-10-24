export interface Isla {
  id:                       number;
  nombre:                   string;
  descripcion:              string;
  imagenes:                 string[];
  videos:                   string[];
  linkDescarga:             string;
  autorId:                  number;
  autorNombre:              string;
  autorCorreo:              string;
  autorFotoPerfilUrl:       string;
  autorRol:                 AutorRol;
  etiquetas:                string[];
  visitas:                  number;
  fechaCreacion:            Date;
  fechaActualizacion:       Date;
  version:                  number;
  categorias:               Categoria[];
  favoritoIds:              number[];
  puntuacioneCalificacions: number[];
  meGustaTipos:             MeGustaTipo[];
  estado:                   Estado;
}

export enum AutorRol {
  Administrador = "ADMINISTRADOR",
  Profesor = "PROFESOR"
}

export enum Estado {
  Habilitado = "HABILITADO",
  Deshabilitado = "DESHABILITADO",
}

export enum MeGustaTipo {
  MeGusta = "ME_GUSTA",
  NoMeGusta = "NO_ME_GUSTA",
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}
