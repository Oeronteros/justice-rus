import { api } from './client';
import {
  guideSummarySchema,
  guideDetailSchema,
  guideCommentSchema,
  voteResponseSchema,
  type GuideSummary,
  type GuideDetail,
  type GuideComment,
  type CreateGuideDto,
  type CreateCommentDto,
  type VoteResponse,
} from '@/lib/schemas/guide';
import { z } from 'zod';

export const guidesApi = {
  list: async (): Promise<GuideSummary[]> => {
    return api.get('guide', z.array(guideSummarySchema));
  },

  get: async (id: string, voterKey: string): Promise<GuideDetail> => {
    return api.get(`guide/${id}?voterKey=${encodeURIComponent(voterKey)}`, guideDetailSchema);
  },

  create: async (data: CreateGuideDto): Promise<GuideSummary> => {
    return api.post('guide', data, guideSummarySchema);
  },

  vote: async (id: string, voterKey: string): Promise<VoteResponse> => {
    return api.post(`guide/${id}/vote`, { voterKey }, voteResponseSchema);
  },

  addComment: async (id: string, data: CreateCommentDto): Promise<GuideComment> => {
    return api.post(`guide/${id}/comment`, data, guideCommentSchema);
  },
};
