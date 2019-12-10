// import { Request } from "express";

// import { Request } from "express-serve-static-core";

interface PageI {
  title: string;
  content: string;
  conflPageId: string;
  conflChildrenId: Array<string>;
  program: string;
}
type Pages = Array<PageI>;
interface UserI {
  id: import("bson").ObjectID;
  googleId: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  isLoggedIn: boolean;
  picture: String;
}
declare namespace Express {
  export interface Request {
    user?: UserI;
    logout: Function;
  }
}
