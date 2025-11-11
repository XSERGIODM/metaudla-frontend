import {Component, inject, OnInit, signal, computed} from '@angular/core';
import {HeaderSeccionIslaPage} from './header-seccion-isla-page/header-seccion-isla-page';
import {FilterSeccionIslaPage, FilterState} from './filter-seccion-isla-page/filter-seccion-isla-page';
import {IslaService} from '../../service/isla-service';
import {GridIsla} from '../../shared/grid-isla/grid-isla';
import {Paginacion} from '../../type/Paginacion';
import {Isla} from '../../type/Isla';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-isla-page',
  imports: [
    HeaderSeccionIslaPage,
    FilterSeccionIslaPage,
    GridIsla,
    Loader
  ],
  templateUrl: './isla-page.html',
  styleUrl: './isla-page.css'
})
export default class IslaPage implements OnInit{

  islaService= inject(IslaService);
  isLoading = signal<boolean>(true);

  lista = signal<Isla[]>([]);
  filters = signal<FilterState>({
    searchTerm: '',
    sortBy: 'popular',
    categoria: ''
  });

  // Computed signal para filtrar y ordenar las islas
  filteredIslas = computed(() => {
    let filtered = this.lista();

    const { searchTerm, categoria, sortBy } = this.filters();

    // Filtrar por búsqueda
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(isla =>
        isla.nombre.toLowerCase().includes(search) ||
        isla.descripcion.toLowerCase().includes(search)
      );
    }

    // Filtrar por categoría
    if (categoria) {
      filtered = filtered.filter(isla =>
        isla.categorias.some(cat => cat.nombre === categoria)
      );
    }



    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.visitas - a.visitas;
        case 'recent':
          return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
        case 'rating':
          const ratingA = a.puntuacioneCalificacions.length > 0
            ? a.puntuacioneCalificacions.reduce((sum, val) => sum + val, 0) / a.puntuacioneCalificacions.length
            : 0;
          const ratingB = b.puntuacioneCalificacions.length > 0
            ? b.puntuacioneCalificacions.reduce((sum, val) => sum + val, 0) / b.puntuacioneCalificacions.length
            : 0;
          return ratingB - ratingA;
        case 'alpha-asc':
          return a.nombre.localeCompare(b.nombre);
        case 'alpha-desc':
          return b.nombre.localeCompare(a.nombre);
        default:
          return 0;
      }
    });

    return filtered;
  });

  obtenerLista(){
    this.isLoading = signal<boolean>(true);
    this.islaService.listarIslas().subscribe((lista: Isla[]) => {
      this.lista.set(lista);
      this.isLoading = signal<boolean>(false);
    });
  }

  ngOnInit(): void {
    this.obtenerLista();
  }

  onFiltersChanged(newFilters: FilterState) {
    this.filters.set(newFilters);
  }

}
