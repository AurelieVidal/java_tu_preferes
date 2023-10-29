import {Liaison} from "./liaison.model";

export interface Theme {
  id?: bigint;
  name: string;
  paires: Liaison[];
}




