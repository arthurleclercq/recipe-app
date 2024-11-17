export interface Recette {
  id: number;
  nom: string;
  ingredients: string;
  instructions: string;
  temps_preparation: number;
  categorie: string;
  vues: number;
  image_url: string | null;
  date_creation: Date;
  date_modification: Date;
  createur_id:number;
  createur_nom_utilisateur: string;
}