import { Group } from "./group.model";

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  adress: string;
  fax: string;
  email: string;
  city: string;
  picture: string;
  active: boolean;
  dateNaissanced: any;
  dateCreated: Date;
  groupIds: any[];
  userName: string;
  password: string;
}
