import { UsersCollection } from "../db/models/user.js";

export const updateUser = (userId, payload) => {
  return UsersCollection.findByIdAndUpdate(userId, payload, { new: true });
};

export const getUserById = async (id) => UsersCollection.findById(id);

export const deleteUser = async (id) =>
  UsersCollection.findOneAndDelete({ _id: id });
