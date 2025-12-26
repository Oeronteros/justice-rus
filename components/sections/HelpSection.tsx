'use client';

import { User } from '@/types';

interface HelpSectionProps {
  user: User;
}

export default function HelpSection({ user }: HelpSectionProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          <i className="fas fa-hands-helping mr-3 text-red-500"></i>
          Help & Support
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">
              <i className="fas fa-question-circle text-red-500 mr-2"></i>
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How do I join the guild?</h4>
                <p className="text-gray-300 text-sm">
                  Contact one of the officers or guild master through Discord.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What are the requirements?</h4>
                <p className="text-gray-300 text-sm">
                  Active participation, following guild rules, and maintaining good KPI.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4">
              <i className="fas fa-headset text-red-500 mr-2"></i>
              Contact Support
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Discord</h4>
                <p className="text-gray-300 text-sm">
                  Join our Discord server and contact moderators.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">In-Game</h4>
                <p className="text-gray-300 text-sm">
                  Message guild officers or guild master directly.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <i className="fas fa-book text-red-500 mr-2"></i>
              Guild Rules
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Be respectful to all guild members</li>
              <li>Participate in guild activities regularly</li>
              <li>Follow the KPI requirements</li>
              <li>Report absences in advance</li>
              <li>No toxic behavior or harassment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

