import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoriaService} from '../../../service/categoria-service';
import {CategoriaType} from '../../../type/CategoriaType';

@Component({
  selector: 'app-gestion-categoria-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-categoria-modal.html',
  styleUrl: './gestion-categoria-modal.css'
})
export default class GestionCategoriaModal implements OnInit {
  @Input() categoria: CategoriaType | null = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() categoriaGuardada = new EventEmitter<void>();

  formBuilder = inject(FormBuilder);
  categoriaService = inject(CategoriaService);

  formCategoria: FormGroup = this.formBuilder.group({
    id: [null],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.categoria) {
      this.formCategoria.patchValue(this.categoria);
    }
  }

  guardarCategoria(): void {
    if (this.formCategoria.invalid) {
      return;
    }

    const categoriaData = this.formCategoria.value;

    if (categoriaData.id) {
      this.categoriaService.actualizarCategoria(categoriaData).subscribe(() => {
        this.categoriaGuardada.emit();
        this.cerrar.emit();
      });
    } else {
      const { id, ...categoriaSinId } = categoriaData;
      this.categoriaService.crearCategoria(categoriaSinId).subscribe(() => {
        this.categoriaGuardada.emit();
        this.cerrar.emit();
      });
    }
  }
}
