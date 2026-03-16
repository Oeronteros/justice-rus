'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { GuidesList } from './GuidesList';
import { GuideModal } from './GuideModal';
import { GuideEditor } from './GuideEditor';
import { useGuides } from '@/lib/guides/hooks';
import { normalizeGuideTitle } from '@/lib/guides/obsidian';
import type { User } from '@/lib/schemas/auth';
import { useHeader } from '@/lib/ui/headerContext';
import { canModerateContent } from '@/lib/authz';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';

interface GuidesSectionProps {
  user: User;
}

function GuidesSectionContent({ user }: GuidesSectionProps) {
  const [createOpen, setCreateOpen] = useState(false);
  const { hideHeader, showHeader } = useHeader();
  const { data: guides = [] } = useGuides();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const canModerate = canModerateContent(user.role);

  const replaceGuideParam = useCallback((guideId: string | null) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (guideId) {
      const selectedGuide = guides.find((guide) => guide.id === guideId);
      params.set('guide', guideId);
      if (selectedGuide) {
        params.set('slug', selectedGuide.slug || normalizeGuideTitle(selectedGuide.title));
      }
    } else {
      params.delete('guide');
      params.delete('slug');
    }
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }, [guides, pathname, router, searchParams]);

  const openGuideId = useMemo(() => {
    const guideFromUrl = searchParams?.get('guide');
    if (guideFromUrl) {
      return guideFromUrl;
    }

    const slugFromUrl = searchParams?.get('slug');
    if (!slugFromUrl || guides.length === 0) {
      return null;
    }

    const matchedGuide = guides.find(
      (guide) => (guide.slug || normalizeGuideTitle(guide.title)) === normalizeGuideTitle(slugFromUrl)
    );

    return matchedGuide?.id || null;
  }, [guides, searchParams]);

  const openGuide = (guideId: string) => {
    replaceGuideParam(guideId);
  };

  const handleGuideClick = (guideId: string) => {
    openGuide(guideId);
  };

  const handleCloseGuide = () => {
    replaceGuideParam(null);
  };

  const handleCreateClick = () => {
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  const handleCreateSuccess = (guideId: string) => {
    openGuide(guideId);
  };

  useEffect(() => {
    const slugFromUrl = searchParams?.get('slug');

    if (!searchParams?.get('guide') && slugFromUrl && openGuideId) {
      replaceGuideParam(openGuideId);
    }
  }, [openGuideId, replaceGuideParam, searchParams]);

  useEffect(() => {
    const modalOpen = Boolean(openGuideId) || createOpen;
    if (modalOpen) {
      hideHeader();
    } else {
      showHeader();
    }

    return () => {
      showHeader();
    };
  }, [createOpen, hideHeader, openGuideId, showHeader]);

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
          <GuidesList
            onGuideClick={handleGuideClick}
            onCreateClick={handleCreateClick}
          />
        </div>
      </div>

      {openGuideId && (
        <GuideModal
          guideId={openGuideId}
          onClose={handleCloseGuide}
          onGuideSelect={openGuide}
          canModerate={canModerate}
          userRole={user.role}
          userId={user.id}
        />
      )}

      {createOpen && (
        <GuideEditor
          onClose={handleCloseCreate}
          onSuccess={handleCreateSuccess}
        />
      )}
    </section>
  );
}

export default function GuidesSection({ user }: GuidesSectionProps) {
  return (
    <ErrorBoundary>
      <GuidesSectionContent user={user} />
    </ErrorBoundary>
  );
}

export { GuideCard } from './GuideCard';
export { GuidesList } from './GuidesList';
export { GuideModal } from './GuideModal';
export { GuideEditor } from './GuideEditor';
export { GuideComments } from './GuideComments';
