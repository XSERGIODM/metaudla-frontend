// YApi QuickType插件生成，具体参考文档:https://plugins.jetbrains.com/plugin/18847-yapi-quicktype/documentation

export interface CategoriaPegableType {
    page:    Page;
    content: Content[];
}

export interface Content {
    descripcion: string;
    estado:      string;
    islas:       Isla[];
    id:          number;
    nombre:      string;
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
