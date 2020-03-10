import { plainToClass } from '@marcj/marshal';
import { PrEntity } from '@pimp-my-pr/server/repository/core/domain';
import { BitbucketPrDetailsEntity } from '../domain/entities/bitbucket-pr-details.entity';
import { mapBitbucketAccount } from './map-bitbucket-account';
import { mapBitbucketParticipantUser } from './map-bitbucket-participant-user';
import { BitbucketUuidUtil } from '../utils/bitbucket-uuid.util';

export const mapBitbucketPrDetails = (pr: BitbucketPrDetailsEntity): PrEntity =>
  plainToClass(PrEntity, {
    ...pr,
    additions: pr.diff.map(diff => diff.lines_added).reduce((prev, curr) => prev + curr),
    changedFiles: pr.diff.length,
    createdAt: pr.created_on,
    deletions: pr.diff.map(diff => diff.lines_removed).reduce((prev, curr) => prev + curr),
    url: pr.links.html.href,
    id: BitbucketUuidUtil.parseFrom(`${pr.id}`),
    reviewers: pr.reviewers.map(mapBitbucketParticipantUser),
    updatedAt: pr.updated_on,
    author: mapBitbucketAccount(pr.author),
    commentsCount: pr.comment_count
  });
