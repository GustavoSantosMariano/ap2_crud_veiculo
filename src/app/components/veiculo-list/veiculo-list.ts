import { Component, OnInit, inject } from '@angular/core';
import { Veiculo } from '../../models/veiculo';
import { VeiculoService } from '../../service/veiculo.service';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  templateUrl: './veiculo-list.html',
  styleUrl: './veiculo-list.css'
})
export class VeiculoList implements OnInit {

  private readonly service = inject(VeiculoService);

  veiculos: Veiculo[] = [];
  carregando = false;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;

    this.service.listar().subscribe({
      next: (dados) => {
        this.veiculos = dados;
        this.carregando = false;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar veículos:', erro);
        this.carregando = false;
      }
    });
  }

  editar(veiculo: Veiculo): void {

    if (!veiculo.id) {
      return;
    }

    const novoModelo = prompt(
      'Digite o novo modelo:',
      veiculo.modelo
    );

    if (!novoModelo) {
      return;
    }

    const atualizado: Veiculo = {
      ...veiculo,
      modelo: novoModelo
    };

    this.service.atualizar(veiculo.id, atualizado).subscribe({
      next: () => this.carregar(),
      error: (erro: any) => {
        console.error('Erro ao editar veículo:', erro);
      }
    });
  }

  excluir(veiculo: Veiculo): void {

    if (!veiculo.id) {
      return;
    }

    const confirmou = confirm(
      `Deseja excluir o veículo ${veiculo.modelo}?`
    );

    if (!confirmou) {
      return;
    }

    this.service.excluir(veiculo.id).subscribe({
      next: () => this.carregar(),
      error: (erro: any) => {
        console.error('Erro ao excluir veículo:', erro);
      }
    });
  }
}