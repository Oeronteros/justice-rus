'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { GuidesList } from './GuidesList';
import { GuideModal } from './GuideModal';
import { GuideEditor } from './GuideEditor';
import { useGuides } from '@/lib/hooks/useGuides';
import { normalizeGuideTitle } from '@/lib/guides/obsidian';
import type { User } from '@/types';
import { useHeader } from '@/lib/ui/headerContext';
import { canModerateContent } from '@/lib/authz';

interface GuidesSectionProps {
  user: User;
}

function GuidesSectionContent({ user }: GuidesSectionProps) {
  const [openGuideId, setOpenGuideId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const { hideHeader, showHeader } = useHeader();
  const { data: guides = [] } = useGuides();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const canModerate = canModerateContent(user.role);

  const replaceGuideParam = (guideId: string | null) => {
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
  };

  const openGuide = (guideId: string) => {
    setOpenGuideId(guideId);
    replaceGuideParam(guideId);
  };

  const handleGuideClick = (guideId: string) => {
    openGuide(guideId);
  };

  const handleCloseGuide = () => {
    setOpenGuideId(null);
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
    const guideFromUrl = searchParams?.get('guide');
    const slugFromUrl = searchParams?.get('slug');

    if (guideFromUrl && guideFromUrl !== openGuideId) {
      setOpenGuideId(guideFromUrl);
      return;
    }

    if (!guideFromUrl && slugFromUrl && guides.length > 0) {
      const matchedGuide = guides.find((guide) => (guide.slug || normalizeGuideTitle(guide.title)) === normalizeGuideTitle(slugFromUrl));
      if (matchedGuide && matchedGuide.id !== openGuideId) {
        setOpenGuideId(matchedGuide.id);
        replaceGuideParam(matchedGuide.id);
        return;
      }
    }

    if (!guideFromUrl && openGuideId) {
      setOpenGuideId(null);
    }
  }, [guides, openGuideId, searchParams]);

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
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GuidesList
          onGuideClick={handleGuideClick}
          onCreateClick={handleCreateClick}
        />
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
