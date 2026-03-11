import {
  deleteApiGuideById,
  getApiGuide,
  getApiGuideById,
  patchApiGuideById,
  postApiGuide,
  postApiGuideByIdComment,
  postApiGuideByIdVote,
} from '@/lib/api/generated';
import {
  guideSummarySchema,
  guideDetailSchema,
  guideCommentSchema,
  guideEntitySchema,
  voteResponseSchema,
  type GuideSummary,
  type GuideDetail,
  type GuideEntity,
  type GuideComment,
  type CreateGuideDto,
  type CreateCommentDto,
  type VoteResponse,
} from '@/lib/schemas/guide';
import { z } from 'zod';
import { sameOriginOpenApiClient } from './openapi-client';

export const guidesApi = {
  list: async (): Promise<GuideSummary[]> => {
    const response = await getApiGuide({ client: sameOriginOpenApiClient });
    return z.array(guideSummarySchema).parse(response.data || []);
  },

  get: async (id: string, voterKey: string): Promise<GuideDetail> => {
    const response = await getApiGuideById({
      client: sameOriginOpenApiClient,
      path: { id },
      query: voterKey ? { voterKey } : {},
    });
    return guideDetailSchema.parse(response.data || {});
  },

  create: async (data: CreateGuideDto): Promise<GuideSummary> => {
    const response = await postApiGuide({
      client: sameOriginOpenApiClient,
      body: data,
    });
    return guideSummarySchema.parse(response.data || {});
  },

  update: async (id: string, data: Pick<CreateGuideDto, 'title' | 'content' | 'category'>): Promise<GuideEntity> => {
    const response = await patchApiGuideById({
      client: sameOriginOpenApiClient,
      path: { id },
      body: data,
    });
    return guideEntitySchema.parse(response.data || {});
  },

  vote: async (id: string, voterKey: string): Promise<VoteResponse> => {
    const response = await postApiGuideByIdVote({
      client: sameOriginOpenApiClient,
      path: { id },
      body: { voterKey },
    });
    return voteResponseSchema.parse(response.data || {});
  },

  addComment: async (id: string, data: CreateCommentDto): Promise<GuideComment> => {
    const response = await postApiGuideByIdComment({
      client: sameOriginOpenApiClient,
      path: { id },
      body: data,
    });
    return guideCommentSchema.parse(response.data || {});
  },

  remove: async (id: string): Promise<{ success: boolean }> => {
    const response = await deleteApiGuideById({
      client: sameOriginOpenApiClient,
      path: { id },
    });
    return z.object({ success: z.boolean() }).parse(response.data || {});
  },
};
