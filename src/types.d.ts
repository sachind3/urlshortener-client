//types.d.ts
import { ReactNode } from "react";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export interface ITotalStats {
  title: string;
  count: number;
  icon: ReactNode;
}

export interface IUrlObj {
  _id: string;
  title: string;
  original_url: string;
  short_url: string;
  custom_url?: string;
  createdAt?: Date | string | null;
}

export interface IClickStat {
  device: string;
  city: string;
  country: string;
}
