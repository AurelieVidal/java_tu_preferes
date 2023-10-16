export class Perso{
  prenom!: string;
  photoUrl!:string;


  constructor(prenom: string,photo:string){
    this.prenom =prenom;
    this.photoUrl =photo;
  }
}
