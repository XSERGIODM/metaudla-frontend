import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css'
})
export class AboutPage {

  /**
   * Método para obtener estadísticas actuales del metaverso
   */
  getEstadisticasMetaverso() {
    return {
      islasDisponibles: 47,
      usuariosActivos: 12500,
      usuariosEnLinea: 156,
      satisfaccion: 98,
      anoLanzamiento: 2024,
      anoSiguiente: 2025
    };
  }

  /**
   * Método para obtener información del equipo de desarrollo
   */
  getEquipoDesarrollo() {
    return [
      {
        nombre: 'Administrador del Sistema',
        rol: 'Director de Proyecto & Desarrollador Principal',
        descripcion: 'Líder del proyecto con más de 10 años de experiencia en desarrollo de software educativo y tecnologías inmersivas.',
        iniciales: 'AD'
      },
      {
        nombre: 'Especialista VR/AR',
        rol: 'Ingeniero de Realidad Virtual',
        descripcion: 'Experto en desarrollo de experiencias inmersivas y optimización de motores gráficos para aplicaciones educativas.',
        iniciales: 'VR'
      },
      {
        nombre: 'Investigador IA',
        rol: 'Científico de Datos Educativos',
        descripcion: 'Especialista en machine learning aplicado a la educación y desarrollo de sistemas de tutoría inteligente.',
        iniciales: 'AI'
      }
    ];
  }

  /**
   * Método para obtener las fases del roadmap
   */
  getRoadmap() {
    return [
      {
        fase: 1,
        titulo: 'Fase 1 - Fundación (2024)',
        descripcion: 'Lanzamiento inicial con islas básicas de matemáticas y ciencias. Estabilidad de plataforma y primeros usuarios.',
        estado: 'completado',
        color: 'green',
        elementos: ['Completado', '47 Islas', '12.5K+ Usuarios']
      },
      {
        fase: 2,
        titulo: 'Fase 2 - Expansión (2025)',
        descripcion: 'Incorporación de inteligencia artificial avanzada y expansión a nuevas áreas de conocimiento.',
        estado: 'desarrollo',
        color: 'blue',
        elementos: ['En Desarrollo', 'Tutores IA', 'Nuevas Islas']
      },
      {
        fase: 3,
        titulo: 'Fase 3 - Revolución (2026)',
        descripcion: 'Integración con blockchain para certificación descentralizada y realidad mixta avanzada.',
        estado: 'planificado',
        color: 'purple',
        elementos: ['Planificado', 'Blockchain', 'Realidad Mixta']
      }
    ];
  }

  /**
   * Método para obtener características principales
   */
  getCaracteristicas() {
    return [
      {
        icono: '🏝️',
        titulo: 'Islas Educativas Especializadas',
        descripcion: 'Cada isla está diseñada específicamente para un área de conocimiento, creando ambientes óptimos para diferentes tipos de aprendizaje.'
      },
      {
        icono: '🎯',
        titulo: 'Aprendizaje Gamificado',
        descripcion: 'Elementos de juego y desafíos que mantienen a los estudiantes motivados y comprometidos con su proceso de aprendizaje.'
      },
      {
        icono: '📊',
        titulo: 'Analytics de Aprendizaje',
        descripcion: 'Seguimiento detallado del progreso estudiantil con métricas avanzadas e informes personalizados para optimizar el rendimiento.'
      },
      {
        icono: '🌐',
        titulo: 'Acceso Global',
        descripcion: 'Plataforma accesible desde cualquier parte del mundo, eliminando barreras geográficas y democratizando la educación de calidad.'
      }
    ];
  }
}
