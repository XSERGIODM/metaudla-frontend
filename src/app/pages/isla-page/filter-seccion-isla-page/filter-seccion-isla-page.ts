import {Component, inject, OnInit, output, signal} from '@angular/core';
import {CategoriaService} from '../../../service/categoria-service';
import {CategoriaType} from '../../../type/CategoriaType';

export interface FilterState {
  searchTerm: string;
  sortBy: string;
  categoria: string;
}

@Component({
  selector: 'app-filter-seccion-isla-page',
  imports: [],
  templateUrl: './filter-seccion-isla-page.html',
  styleUrl: './filter-seccion-isla-page.css'
})
export class FilterSeccionIslaPage implements OnInit {

  categoriaService = inject(CategoriaService);

  // Signals para los filtros
  searchTerm = signal<string>('');
  sortBy = signal<string>('popular');
  categoria = signal<string>('');

  // Signal para las categorías desde la BD
  categorias = signal<CategoriaType[]>([]);

  // Output para emitir cambios de filtros
  filtersChanged = output<FilterState>();

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.listarCategorias(0, 100).subscribe({
      next: (response) => {
        this.categorias.set(response.content);
      },
      error: (error) => {
        console.error('Error cargando categorías:', error);
      }
    });
  }

  // Métodos para manejar cambios
  onSearchChange(value: string) {
    this.searchTerm.set(value);
    this.emitFilters();
  }

  onSortChange(value: string) {
    this.sortBy.set(value);
    this.emitFilters();
  }

  onCategoriaChange(value: string) {
    this.categoria.set(value);
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      searchTerm: this.searchTerm(),
      sortBy: this.sortBy(),
      categoria: this.categoria()
    });
  }
}
