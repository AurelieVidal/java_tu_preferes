export class joueur{
  pseudo!: string;
  photoUrl!:string;


  constructor(pseudo: string,photo:string){
    this.pseudo =pseudo;
    this.photoUrl =photo;
  }
}
