import { fetchUsers, fetchUserById, createUser, updateUserName, fetchUserByAuth0Sub } from '../../api/userApi';
import { User } from '../../domain/entities/User';
import { AppDispatch } from '../../store/store';

export interface UserRepository {
  createUser(user: { name: string; email: string; auth0_sub: string; accessToken: string }): Promise<User>;
  updateUserName(user: {id: number; name: string; email: string; accessToken: string }): Promise<User>;
  fetchUsers(): Promise<User[]>;
  fetchUserById(userId: number): Promise<User | null>;
  fetchUserByAuth0Sub(user: { accessToken: string }): Promise<User>;
}

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private dispatch: AppDispatch
  ) {}

  async createUser(user: { name: string; email: string; auth0_sub: string; accessToken: string }): Promise<User> {
    const result = await this.dispatch(createUser(user)).unwrap();
    return result;
  }

  async updateUserName(user: {id: number; name: string; email: string; accessToken: string }): Promise<User> {
    const result = await this.dispatch(updateUserName(user)).unwrap();
    return result;
  }
  
  async fetchUsers(): Promise<User[]> {
    const result = await this.dispatch(fetchUsers()).unwrap();
    return result;
  }

  async fetchUserById(userId: number): Promise<User | null> {
    const result = await this.dispatch(fetchUserById({userId})).unwrap();
    return result;
  }

  async fetchUserByAuth0Sub(user: { accessToken: string }): Promise<User> {
    const result = await this.dispatch(fetchUserByAuth0Sub(user)).unwrap();
    return result;
  }
}