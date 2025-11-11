import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuditoriaService } from '../../service/auditoria-service';
import { Auditoria, AuditoriaResponse } from '../../type/Auditoria';

@Component({
  selector: 'app-logs-auditoria-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './logs-auditoria-page.html',
  styleUrl: './logs-auditoria-page.css'
})
export default class LogsAuditoriaPage implements OnInit {

  private auditoriaService = inject(AuditoriaService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  auditorias = signal<Auditoria[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);
  currentPage = signal<number>(0);
  pageSize = signal<number>(20);

  filterForm: FormGroup;

  sortBy = signal<string>('timestamp');
  sortDir = signal<string>('desc');

  constructor() {
    this.filterForm = this.fb.group({
      usuarioNombre: [''],
      endpoint: [''],
      metodoHttp: [''],
      codigoRespuesta: [''],
      exito: [''],
      fechaDesde: [''],
      fechaHasta: [''],
      busqueda: ['']
    });
  }

  ngOnInit() {
    this.loadAuditorias();
  }

  loadAuditorias() {
    this.loading.set(true);
    this.error.set(null);

    const filters = this.getFiltersFromForm();

    this.auditoriaService.getAuditorias(
      this.currentPage(),
      this.pageSize(),
      this.sortBy(),
      this.sortDir(),
      filters
    ).subscribe({
      next: (response: AuditoriaResponse) => {
        this.auditorias.set(response.content);
        this.totalElements.set(response.totalElements);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar auditorías:', err);
        this.error.set('Error al cargar los logs de auditoría');
        this.loading.set(false);
      }
    });
  }

  private getFiltersFromForm(): any {
    const formValue = this.filterForm.value;
    const filters: any = {};

    if (formValue.usuarioNombre?.trim()) filters.usuarioNombre = formValue.usuarioNombre.trim();
    if (formValue.endpoint?.trim()) filters.endpoint = formValue.endpoint.trim();
    if (formValue.metodoHttp?.trim()) filters.metodoHttp = formValue.metodoHttp.trim();
    if (formValue.codigoRespuesta) filters.codigoRespuesta = parseInt(formValue.codigoRespuesta);
    if (formValue.exito !== '' && formValue.exito !== null) filters.exito = formValue.exito === 'true';
    if (formValue.fechaDesde) filters.fechaDesde = formValue.fechaDesde;
    if (formValue.fechaHasta) filters.fechaHasta = formValue.fechaHasta;
    if (formValue.busqueda?.trim()) filters.busqueda = formValue.busqueda.trim();

    return Object.keys(filters).length > 0 ? filters : undefined;
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadAuditorias();
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(0);
    this.loadAuditorias();
  }

  onPageSizeChangeEvent(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target && target.value) {
      const size = parseInt(target.value, 10);
      if (!isNaN(size) && size > 0) {
        this.onPageSizeChange(size);
      }
    }
  }

  onSortChange(sortBy: string) {
    if (this.sortBy() === sortBy) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(sortBy);
      this.sortDir.set('desc');
    }
    this.loadAuditorias();
  }

  applyFilters() {
    this.currentPage.set(0);
    this.loadAuditorias();
  }

  clearFilters() {
    this.filterForm.reset();
    this.currentPage.set(0);
    this.loadAuditorias();
  }

  goBack() {
    this.router.navigate(['/dashboard-admin']);
  }

  getIconForMethod(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET': return '👁️';
      case 'POST': return '➕';
      case 'PUT': return '✏️';
      case 'DELETE': return '🗑️';
      default: return '📋';
    }
  }

  getBadgeClass(exito: boolean): string {
    return exito
      ? 'px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs'
      : 'px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs';
  }

  getBadgeText(exito: boolean): string {
    return exito ? 'Éxito' : 'Error';
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getSortIcon(field: string): string {
    if (this.sortBy() !== field) return '↕️';
    return this.sortDir() === 'asc' ? '↑' : '↓';
  }
}
