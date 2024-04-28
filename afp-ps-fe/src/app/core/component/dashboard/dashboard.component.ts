import {Component} from "@angular/core";
import {TabellaPazientiComponent} from "../tabella-pazienti/tabella-pazienti.component";
import { RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [TabellaPazientiComponent, RouterLink, RouterLinkActive],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent {
  constructor() {}
}
