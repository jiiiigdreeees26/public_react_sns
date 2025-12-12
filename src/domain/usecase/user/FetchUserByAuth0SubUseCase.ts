import { User } from '../../entities/User';
import { UserRepository } from '../../../data/repositories/UserRepository';

export class FetchUserByAuth0SubUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(accessToken: string): Promise<User> {
    if (!accessToken) {
      throw new Error('AccessToken is required');
    }
    return await this.userRepository.fetchUserByAuth0Sub( { accessToken });
  }
}