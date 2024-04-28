import {Component} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import {IPaziente} from "../../service/models/IPaziente";
import {CoreHttpService} from "../../service/core-http/core-http.service";

@Component({
  selector: "app-inserimento-pazienti",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: "./inserimento-pazienti.component.html",
  styleUrl: "./inserimento-pazienti.component.css",
})
export class InserimentoPazientiComponent {
  inserimentoPazienti: FormGroup;
  idPaziente: string | null;

  constructor(
    private coreHttp: CoreHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /**
     * - codicePaziente
     * - nome
     * - cognome
     * - dataNascita
     * - medico
     * - coriceColore
     * - stato
     * - MmodalitaArrivo
     */
    this.inserimentoPazienti = new FormGroup({
      codicePaziente: new FormControl(""),
      nome: new FormControl("", [Validators.required]),
      cognome: new FormControl(""),
      dataNascita: new FormControl(""),
      medico: new FormControl(""),
      codiceColore: new FormControl(""),
      stato: new FormControl(""),
      modalitaArrivo: new FormControl(""),
    });

    this.idPaziente = this.route.snapshot.paramMap.get("idPaziente");
  }

  ngOnInit() {
    if (this.idPaziente !== null) {
      this.coreHttp
        .get<IPaziente[]>("/getPatientById/" + this.idPaziente)
        .subscribe((res: IPaziente[]) => {
          console.log(res);
          this.inserimentoPazienti.patchValue(res[0]);
        });
    }
  }

  inserisciPaziente() {
    const pz: IPaziente = this.inserimentoPazienti.value as IPaziente;
    console.log(pz);

    if (this.idPaziente !== null) {
      this.coreHttp
        .put("/updatePatient/" + this.idPaziente, pz)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(["/"]);
        });
      return;
    }

    this.coreHttp.post("/createPatient", pz).subscribe((res) => {
      console.log(res);
      this.router.navigate(["/"]);
    });
  }
}
