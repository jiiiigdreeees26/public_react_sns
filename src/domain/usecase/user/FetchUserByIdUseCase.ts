import { User } from '../../entities/User';
import { UserRepository } from '../../../data/repositories/UserRepository';

export class FetchUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number, accessToken: string): Promise<User | null> {
    return this.userRepository.fetchUserById(userId);
  }
}