import { Query } from "@/application/types";
import { UserData } from "@/slices/user/entities";
import { UpdateUserRepository } from "@/slices/user/repositories";

export type updateUser = (query: Query, data: UserData) => Promise<UserData | null>;

export type updateUserSignature = (updateUser: UpdateUserRepository) => updateUser;

export const updateUserUsecase: updateUserSignature =
    (updateUser: UpdateUserRepository) => (query: Query, data: UserData) => {
        return updateUser.updateUser(query, data);
    };
