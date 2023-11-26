export interface PlayerInfo {
  pseudo: string;
  image_path: string;
  predictions: number[];
  choices: string[];
  totalEcart?: number;
  position?: number;
}
