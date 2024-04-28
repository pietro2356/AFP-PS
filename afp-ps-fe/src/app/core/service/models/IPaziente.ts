export interface IPaziente {
  id: number;
  codicePaziente: TCodicePaziente;
  nome: string;
  cognome: string;
  dataNascita: Date;
  medico: string;
  codiceColore: TCodiceColore;
  stato: TStato;
  modalitaArrivo: TModalitaArrivo;
}

type TCodicePaziente = string;
type TCodiceColore = "ROSSO" | "GIALLO" | "VERDE" | "AZZURRO" | "BIANCO";
type TStato = "IN ATTESA" | "IN CURA" | "DIMISSIONE" | "DECEDUTO";
type TModalitaArrivo = "AMBULANZA" | "PRIVATO" | "ALTRO";

// const paziente: Partial<IPaziente> = {
//   codicePaziente: "P001",
//   nome: "Mario",
//   cognome: "Rossi",
//   dataNascita: new Date("1990-01-01"),
//   medico: "Dr. Bianchi",
//   codiceColore: "ROSSO",
//   stato: "IN ATTESA",
//   modalitaArrivo: "AMBULANZA",
// };

// const pz2: Omit<IPaziente, "id"> = {
//   codicePaziente: "P002",
//   nome: "Giuseppe",
//   cognome: "Verdi",
//   dataNascita: new Date("1995-01-01"),
//   medico: "Dr. Rossi",
//   codiceColore: "GIALLO",
//   stato: "IN CURA",
//   modalitaArrivo: "PRIVATO",
// };

// console.log(paziente.dataNascita.getFullYear();

