import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { DeleteUserRepository } from "@/slices/user/repositories";

export type deleteUser = (query: Query) => Promise<UserData | null>;

export type deleteUserSignature = (deleteUser: DeleteUserRepository) => deleteUser;

export const deleteUserUsecase: deleteUserSignature =
    (deleteUser: DeleteUserRepository) => (query: Query) => {
        return deleteUser.deleteUser(query);
    };
