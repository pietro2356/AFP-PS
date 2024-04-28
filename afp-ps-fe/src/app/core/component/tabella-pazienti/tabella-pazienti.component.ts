import {Component, OnInit} from "@angular/core";
import {CoreHttpService} from "../../service/core-http/core-http.service";
import {CommonModule} from "@angular/common";
import {IPaziente} from "../../service/models/IPaziente";
import {Router} from "@angular/router";

@Component({
  selector: "app-tabella-pazienti",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tabella-pazienti.component.html",
  styleUrl: "./tabella-pazienti.component.css",
})
export class TabellaPazientiComponent implements OnInit {
  listaPazienti: IPaziente[] = [];

  stampaErrore: any;

  constructor(private coreHttp: CoreHttpService, private router: Router) {}

  ngOnInit() {
    this.recuperaPazienti();
  }

  public recuperaPazienti() {
    this.coreHttp.get<IPaziente[]>("/getAllPatients").subscribe(
      (data: IPaziente[]) => {
        this.listaPazienti = data;
        console.table(this.listaPazienti);
      },
      (error) => {
        console.error(error);
        this.stampaErrore = error;
      }
    );
  }

  public modificaPaziente(paziente: IPaziente) {
    console.log(paziente);
    this.router.navigate(["/inserimento-pazienti", {idPaziente: paziente.id}]);
  }

  public dimettiPaziente(paziente: IPaziente) {
    this.coreHttp.delete("/deletePatient/" + paziente.id).subscribe((data) => {
      console.log(data);
      this.recuperaPazienti();
    });
  }
}
