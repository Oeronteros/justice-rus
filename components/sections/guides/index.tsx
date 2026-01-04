'use client';

import { useState } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { GuidesList } from './GuidesList';
import { GuideModal } from './GuideModal';
import { GuideEditor } from './GuideEditor';
import type { User } from '@/types';

interface GuidesSectionProps {
  user: User;
}

function GuidesSectionContent({ user }: GuidesSectionProps) {
  const [openGuideId, setOpenGuideId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const canModerate = user.role === 'officer' || user.role === 'gm';

  const handleGuideClick = (guideId: string) => {
    setOpenGuideId(guideId);
  };

  const handleCloseGuide = () => {
    setOpenGuideId(null);
  };

  const handleCreateClick = () => {
    setCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateOpen(false);
  };

  const handleCreateSuccess = (guideId: string) => {
    setOpenGuideId(guideId);
  };

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
          canModerate={canModerate}
          userRole={user.role}
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
