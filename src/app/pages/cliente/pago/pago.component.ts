import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PedidoclienteService } from 'src/app/services/pedidocliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  carrito : any
  pagoForm = this.fb.group({
    tarjeta: ["", Validators.required],
    cvv: ["", Validators.required],
    fecha: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private readonly ps: PedidoclienteService,
    private router: Router) { }

  __getMontoCarrito(){
    const token  = sessionStorage.getItem("token");
    const header = { Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUyREE5MTM2M0QwMkM2ODYwMTM2NEU1QzhGQUZDMzY1IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MzkxMTI3MDEsImV4cCI6MTYzOTExNjMwMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiQVBJLUFQUC1VUEMiLCJjbGllbnRfaWQiOiI3MUJCNzIzNi1DOTdGLTQ2RjgtQTBDQi0zOTVBQTBGQ0FEREYiLCJjbGllbnRfbnVtZXJvX2RvY3VtZW50byI6IjQzNjg1MjcxIiwiY2xpZW50X2NvZGlnb191c3VhcmlvIjoiMSIsImp0aSI6IkE0NDhFNzk4OEJFQjk0MUQ2NEI3NzU1RjAyMTIxNkVEIiwiaWF0IjoxNjM5MTEyNzAxLCJzY29wZSI6WyJlbWFpbCJdfQ.wRVh20fE21TbGqAK3SGTq9OAfnlEwiN9_o6i6fpytV5NFfJwdhAlgq_codistv65dUO1nzXrro2guW6damXqY0EMzl_4dZTQP573rIanCIjs4FxW_l2P9MY4DmIcw78jzDVSmHV7lrFkMzcd0wziGZDSHaoPeG9jrcXbb0EZ1XPa1f7m1WhNyLjSZ4xMv1Gk2Aji1kkna-8P5ddPMHjOe_xmeNKOCCc09ECJ_09NPlOgZIgHmgsoqth-dMHnbSyoG0YyONgC-nVfttw5vB8FeVOhN8lm_ZJK_IzgpI4oqlzj4HA9lR1i4nq_w7uiKc2U8rbue9QEAFZI07oVEhfquA" };
    this.ps.__getMontoCarritoCliente(header).subscribe((rest: any) =>{
        this.carrito = rest.data;
        //console.log(rest.data);
    })
  }
  __onSubmit() {
    if(this.pagoForm.valid) {
      this.__insert();
    }
    
  }
  ngOnInit(): void {
    this.__getMontoCarrito();
  }
  __insert() {
    const token  = sessionStorage.getItem("token");
    const header = { Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUyREE5MTM2M0QwMkM2ODYwMTM2NEU1QzhGQUZDMzY1IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2MzkxMTI3MDEsImV4cCI6MTYzOTExNjMwMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiQVBJLUFQUC1VUEMiLCJjbGllbnRfaWQiOiI3MUJCNzIzNi1DOTdGLTQ2RjgtQTBDQi0zOTVBQTBGQ0FEREYiLCJjbGllbnRfbnVtZXJvX2RvY3VtZW50byI6IjQzNjg1MjcxIiwiY2xpZW50X2NvZGlnb191c3VhcmlvIjoiMSIsImp0aSI6IkE0NDhFNzk4OEJFQjk0MUQ2NEI3NzU1RjAyMTIxNkVEIiwiaWF0IjoxNjM5MTEyNzAxLCJzY29wZSI6WyJlbWFpbCJdfQ.wRVh20fE21TbGqAK3SGTq9OAfnlEwiN9_o6i6fpytV5NFfJwdhAlgq_codistv65dUO1nzXrro2guW6damXqY0EMzl_4dZTQP573rIanCIjs4FxW_l2P9MY4DmIcw78jzDVSmHV7lrFkMzcd0wziGZDSHaoPeG9jrcXbb0EZ1XPa1f7m1WhNyLjSZ4xMv1Gk2Aji1kkna-8P5ddPMHjOe_xmeNKOCCc09ECJ_09NPlOgZIgHmgsoqth-dMHnbSyoG0YyONgC-nVfttw5vB8FeVOhN8lm_ZJK_IzgpI4oqlzj4HA9lR1i4nq_w7uiKc2U8rbue9QEAFZI07oVEhfquA" };
    //console.log({idProducto:1,cantidad:1});
    console.log(this.pagoForm.value);
    this.ps.__be_insertarPedidoCarrito(header).subscribe((rest: any) => {
      if(rest.issuccess) {
        alert("Proyecto creado con ID: " + rest.data);
        this.router.navigate(['home']);
      } else {
        alert(rest.errormessage);
      }
    })
  }
}
