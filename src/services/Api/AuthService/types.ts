import { ErrorResponse } from "../BaseServiceAbstract/types";
import { User } from "@/shared/types/User";

export type SignUpParams = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type SignUpResponse =
    | {
          id?: number;
      }
    | ErrorResponse;

export type SignInParams = {
    login: string;
    password: string;
};

export type SignInResponse = null | ErrorResponse;

export type UserResponse = User | ErrorResponse;
