import { Lcommande } from '../model/lcommande';
export class Commande {
    id :number;
    annee : number;
    numero : number;
    code : number;
    nom : String;
    date_mvt : any;
    libelle : String;
    tottht : number;
    tottva : number;
    totttc : number;
    
    lcomms :Array<Lcommande> =[];


}
