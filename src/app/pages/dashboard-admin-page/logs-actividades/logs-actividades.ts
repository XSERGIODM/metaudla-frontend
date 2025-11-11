import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuditoriaService } from '../../../service/auditoria-service';
import { Auditoria } from '../../../type/Auditoria';

@Component({
  selector: 'app-logs-actividades',
  imports: [CommonModule],
  templateUrl: './logs-actividades.html',
  styleUrl: './logs-actividades.css'
})
export default class LogsActividades implements OnInit {

  private auditoriaService = inject(AuditoriaService);
  private router = inject(Router);

  auditorias = signal<Auditoria[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadAuditorias();
  }

  loadAuditorias() {
    this.loading.set(true);
    this.error.set(null);

    this.auditoriaService.getAuditoriasRecientes(4).subscribe({
      next: (data) => {
        this.auditorias.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar auditorías:', err);
        this.error.set('Error al cargar los logs de auditoría');
        this.loading.set(false);
      }
    });
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
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;

    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  navigateToAllLogs() {
    this.router.navigate(['/logs-auditoria']);
  }
}
