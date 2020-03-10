import { f } from '@marcj/marshal';

export abstract class ContributorEntity {
  @f
  name: string;
  @f
  id: string;
  @f
  avatarUrl: string;
  @f
  contributions?: number;
}
