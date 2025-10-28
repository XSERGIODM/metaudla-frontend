export interface User {
    page:    Page;
    content: Content[];
}

export interface Content {
    estado:          string;
    fotoPerfilUrl:   string;
    islas:           Isla[];
    puntuaciones:    Favorito[];
    updatedById:     number;
    nombre:          string;
    rol:             string;
    createdAt:       Date;
    createdByNombre: string;
    correo:          string;
    updatedByNombre: string;
    createdByEstado: string;
    favoritos:       Favorito[];
    id:              number;
    meGustas:        Favorito[];
    createdById:     number;
    createdByRol:    string;
    username:        string;
    updatedAt:       Date;
}

export interface Favorito {
    islaDescripcion: string;
    fechaCreacion:   Date;
    islaId:          number;
    islaNombre:      string;
    id:              number;
    usuarioId:       number;
    usuarioNombre:   string;
    tipo?:           string;
    calificacion?:   number;
}

export interface Isla {
    descripcion: string;
    id:          number;
    nombre:      string;
}

export interface Page {
    number:        number;
    size:          number;
    totalPages:    number;
    totalElements: number;
}
