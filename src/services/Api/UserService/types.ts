import { ErrorResponse } from "@/services/api/BaseServiceAbstract/types";

export type ProfileParams = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type ProfileResponse =
    | {
          id: number;
          first_name: string;
          second_name: string;
          display_name: string;
          login: string;
          email: string;
          phone: string;
          avatar: string;
      }
    | ErrorResponse;
