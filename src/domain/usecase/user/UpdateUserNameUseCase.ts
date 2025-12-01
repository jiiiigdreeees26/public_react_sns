import { User } from '../../entities/User';
import { UserRepository } from '../../../data/repositories/UserRepository';

export class UpdateUserNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number, name: string, email: string, accessToken: string): Promise<User> {
    if (!name.trim()) {
      throw new Error('Name cannot be empty');
    }
    if (!email) {
      throw new Error('Email is required');
    }
    if (!accessToken) {
      throw new Error('AccessToken is required');
    }
    return await this.userRepository.updateUserName({ id, name, email, accessToken });
  }
}