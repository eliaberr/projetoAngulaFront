import { PessoaService } from './../pessoas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pessoa } from './../models/pessoas';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit{

  pessoas: Pessoa[] = [];
  isEditing: boolean = false;
  submited: boolean = false;

  selectedPessoas: Pessoa = {} as Pessoa;
  formGroupPessoa: FormGroup;

  constructor(private pessoaService: PessoaService,
    private formBuilder: FormBuilder
  ){
    this.formGroupPessoa = this.formBuilder.group({
      nome:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.minLength(3)]],
      telefone:['',[Validators.required,Validators.min(8)]],
      endereco:['',[Validators.required,Validators.minLength(3)]],
      cep:['',[Validators.required,Validators.min(6)]],
      estado:['',[Validators.required,Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe(
      {
        next: pessoas => this.pessoas = pessoas
      }
    )
  }

  save() {

    this.submited = true;

    if(this.formGroupPessoa.valid){
     if (this.isEditing) {
       //Atualiza os dados do produto selecionado
      this.selectedPessoas.nome = this.formGroupPessoa.get("name")?.value;
      this.selectedPessoas.email = this.formGroupPessoa.get("email")?.value;
      this.selectedPessoas.telefone = this.formGroupPessoa.get("telefone")?.value;
      this.selectedPessoas.endereco = this.formGroupPessoa.get("endereco")?.value;
      this.selectedPessoas.cep = this.formGroupPessoa.get("cep")?.value;
      this.selectedPessoas.estado = this.formGroupPessoa.get("estado")?.value;


      this.pessoaService.update(this.selectedPessoas).subscribe({
        next: () => {
          this.formGroupPessoa.reset();
          this.isEditing = false;
          this.submited = false;
        }
      })
    }
    else {
      this.pessoaService.save(this.formGroupPessoa.value).subscribe({
        next: Pessoa => {
          this.pessoas.push(Pessoa);
          this.formGroupPessoa.reset();
          this.submited = false;
        }
      })
    }
    }
   }

  delete(pessoa: Pessoa){
    this.pessoaService.delete(pessoa).subscribe({
      next:() =>{
        this.pessoas = this.pessoas.filter(p =>p.id !== pessoa.id)
      }
    })
  }

  cancel(){
    this.formGroupPessoa.reset();
    this.isEditing = false;
    this.submited = false;
  }

  get nome(): any{
    return this.formGroupPessoa.get("nome");
  }
  get email(): any{
    return this.formGroupPessoa.get("email");
  }
  get telefone(): any{
    return this.formGroupPessoa.get("telefone");
  }
  get endereco(): any{
    return this.formGroupPessoa.get("endereco");
  }
  get cep(): any{
    return this.formGroupPessoa.get("cep");
  }
  get estado(): any{
    return this.formGroupPessoa.get("estado");
  }



}
