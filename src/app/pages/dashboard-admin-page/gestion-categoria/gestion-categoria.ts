import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CategoriaService} from '../../../service/categoria-service';
import {CategoriaPegableType} from '../../../type/CategoriaPegableType';
import GestionCategoriaModal from './gestion-categoria-modal';
import {CategoriaType} from '../../../type/CategoriaType';

@Component({
  selector: 'app-gestion-categoria',
  imports: [GestionCategoriaModal],
  templateUrl: './gestion-categoria.html',
  styleUrl: './gestion-categoria.css'
})
export default class GestionCategoria implements OnInit {
  categoriaService = inject(CategoriaService);
  paginaActual = signal(0);
  tamanioPagina = signal(10);
  datosPaginados = signal<CategoriaPegableType>(
    {
      content: [],
      page: {
        number: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0
      }
    }
  );
  categorias = computed(() => this.datosPaginados().content);
  infoPagina = computed(() => this.datosPaginados().page);
  paginas = computed(() => {
    const totalPages = this.infoPagina().totalPages;
    return Array.from({length: totalPages}, (_, i) => i);
  });

  isModalOpen = signal(false);
  categoriaSeleccionada = signal<CategoriaType | null>(null);


  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoriaService.listarCategorias(this.paginaActual(), this.tamanioPagina()).subscribe((data) => {
      this.datosPaginados.set(data);
    });
  }

  abrirModal(categoria?: CategoriaType): void {
    this.categoriaSeleccionada.set(categoria || null);
    this.isModalOpen.set(true);
  }

  cerrarModal(): void {
    this.isModalOpen.set(false);
    this.categoriaSeleccionada.set(null);
  }

  onCategoriaGuardada(): void {
    this.listarCategorias();
  }

  deshabilitarCategoria(id: number): void {
    this.categoriaService.deshabilitarCategoria(id).subscribe(() => {
      this.listarCategorias();
    });
  }

  habilitarCategoria(id: number): void {
    this.categoriaService.habilitarCategoria(id).subscribe(() => {
      this.listarCategorias();
    });
  }

  irAPagina(pagina: number): void {
    this.paginaActual.set(pagina);
    this.listarCategorias();
  }

  paginaSiguiente(): void {
    if (this.paginaActual() < this.infoPagina().totalPages - 1) {
      this.paginaActual.update(pagina => pagina + 1);
      this.listarCategorias();
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual() > 0) {
      this.paginaActual.update(pagina => pagina - 1);
      this.listarCategorias();
    }
  }
}
