import { ParamListBase } from "@react-navigation/routers";
import { StackNavigationProp } from "@react-navigation/stack";

export type Inavigation = StackNavigationProp<ParamListBase>;

export interface IlockManagerConstructor {
  lockTime: number;
  navigation: Inavigation;
}
