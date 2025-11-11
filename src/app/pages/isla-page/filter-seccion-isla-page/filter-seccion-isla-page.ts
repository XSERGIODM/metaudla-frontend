import {Component, output, signal} from '@angular/core';

export interface FilterState {
  searchTerm: string;
  sortBy: string;
  categoria: string;
  etiqueta: string;
}

@Component({
  selector: 'app-filter-seccion-isla-page',
  imports: [],
  templateUrl: './filter-seccion-isla-page.html',
  styleUrl: './filter-seccion-isla-page.css'
})
export class FilterSeccionIslaPage {

  // Signals para los filtros
  searchTerm = signal<string>('');
  sortBy = signal<string>('popular');
  categoria = signal<string>('');
  etiqueta = signal<string>('');

  // Output para emitir cambios de filtros
  filtersChanged = output<FilterState>();

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

  onEtiquetaChange(value: string) {
    this.etiqueta.set(value);
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      searchTerm: this.searchTerm(),
      sortBy: this.sortBy(),
      categoria: this.categoria(),
      etiqueta: this.etiqueta()
    });
  }
}
