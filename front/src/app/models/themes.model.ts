import {Liaison} from "./liaison.model";

export interface ThemeModel {
  id?: bigint;
  name: string;
  paires: Liaison[];
}




