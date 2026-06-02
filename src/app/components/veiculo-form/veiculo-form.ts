import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Veiculo } from '../../models/veiculo';
import { VeiculoService } from '../../service/veiculo.service';

@Component({
  selector: 'app-veiculo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './veiculo-form.html',
  styleUrl: './veiculo-form.css'
})
export class VeiculoForm {

  @Output() salvo = new EventEmitter<void>();

  private readonly service = inject(VeiculoService);

  veiculo: Veiculo = {
    marca: '',
    modelo: '',
    ano: new Date().getFullYear(),
    cor: '',
    placa: '',
    disponivel: true
  };

  salvar() {
    this.service.criar(this.veiculo).subscribe({
      next: () => {
        this.veiculo = {
          marca: '',
          modelo: '',
          ano: new Date().getFullYear(),
          cor: '',
          placa: '',
          disponivel: true
        };

        this.salvo.emit();

        alert('Veículo cadastrado com sucesso!');
      },
      error: (erro: any) => {
        console.error('Erro ao salvar veículo:', erro);
      }
    });
  }
}