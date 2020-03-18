import { RepositoryEntity } from '@pimp-my-pr/server/repository/core/domain';

export abstract class RepositoryRepository {
  abstract getSingleRepository(id: string, token: string): Promise<RepositoryEntity>;
  abstract async findAll(token: string): Promise<RepositoryEntity[]>;
}
