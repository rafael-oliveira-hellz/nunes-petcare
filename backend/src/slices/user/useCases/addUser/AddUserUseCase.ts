import { UserData, UserEntity } from "@/slices/user/entities";
import { AddUserRepository } from "@/slices/user/repositories";

export type addUser = (data: UserData) => Promise<UserEntity | null>;

export type addUserSignature = (addUser: AddUserRepository) => addUser;

export const addUserUsecase: addUserSignature =
    (addUser: AddUserRepository) => (data: UserData) => {
        return addUser.addUser(new UserEntity(data));
    };
