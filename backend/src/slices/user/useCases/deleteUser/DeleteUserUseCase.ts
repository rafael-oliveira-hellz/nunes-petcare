import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { DeleteUserRepository } from "@/slices/user/repositories";

export type DeleteUser = (query: Query) => Promise<UserData | null>;

export type deleteUserSignature = (deleteUser: DeleteUserRepository) => DeleteUser;

export const deleteUser: deleteUserSignature =
    (deleteUser: DeleteUserRepository) => (query: Query) => {
        return deleteUser.deleteUser(query);
    };
