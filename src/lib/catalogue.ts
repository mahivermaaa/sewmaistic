import { Product } from "@/types/sewdarlin";
import {
  NEW_ARRIVALS,
  FAN_FAVOURITES,
  THRIFT_STORE,
  LIP_BALM_HOLDERS,
  MORE_BAGS,
  LITTLE_SOMETHINGS,
  COSPLAY_COSTUMES,
} from "@/data/sewdarlinData";

const ALL: Product[] = [
  ...NEW_ARRIVALS,
  ...FAN_FAVOURITES,
  ...THRIFT_STORE,
  ...LIP_BALM_HOLDERS,
  ...MORE_BAGS,
  ...LITTLE_SOMETHINGS,
  ...COSPLAY_COSTUMES,
];

export function getProductById(id: string): Product | undefined {
  return ALL.find((p) => p.id === id);
}
