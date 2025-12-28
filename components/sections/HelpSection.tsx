'use client';

import { User } from '@/types';
import WuxiaIcon from '../WuxiaIcons';

interface HelpSectionProps {
  user: User;
}

export default function HelpSection({ user }: HelpSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="help" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Help & Support
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Find answers to common questions and get support from the guild community</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600/30 to-red-800/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="seal" className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-red-400">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300">How do I join the guild?</h4>
                <p className="text-gray-400">
                  Contact one of the officers or guild master through Discord. You'll need to meet our basic requirements and participate in a trial period.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300">What are the requirements?</h4>
                <p className="text-gray-400">
                  Active participation in guild activities, following guild rules, maintaining good KPI, and regular attendance at scheduled events.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300">How do I report absences?</h4>
                <p className="text-gray-400">
                  Use the Absences section to submit your absence requests in advance. Make sure to provide a valid reason for your absence.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600/30 to-blue-800/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="shield" className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-blue-400">Contact Support</h3>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300 flex items-center">
                  <WuxiaIcon name="comment" className="inline-block w-4 h-4 mr-2 text-blue-400 align-text-bottom" />
                  Discord
                </h4>
                <p className="text-gray-400">
                  Join our Discord server and contact moderators or guild officers. Our support team is available 24/7 for guild-related issues.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300 flex items-center">
                  <WuxiaIcon name="sword" className="inline-block w-4 h-4 mr-2 text-purple-400 align-text-bottom" />
                  In-Game
                </h4>
                <p className="text-gray-400">
                  Message guild officers or guild master directly in-game. Response time may vary depending on their availability.
                </p>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-gray-300 flex items-center">
                  <WuxiaIcon name="seal" className="inline-block w-4 h-4 mr-2 text-green-400 align-text-bottom" />
                  Email
                </h4>
                <p className="text-gray-400">
                  Send us an email to support@guildportal.com for non-urgent matters. We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="card p-8 hover:transform hover:-translate-y-1 transition-all duration-300 lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-600/30 to-yellow-800/30 rounded-full flex items-center justify-center mr-4">
                <WuxiaIcon name="book" className="w-7 h-7 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold font-orbitron text-yellow-400">Guild Rules</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">Respect Others</h4>
                    <p className="text-gray-400 text-sm">Be respectful to all guild members at all times</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">Regular Participation</h4>
                    <p className="text-gray-400 text-sm">Participate in guild activities regularly</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">KPI Requirements</h4>
                    <p className="text-gray-400 text-sm">Follow the KPI requirements set by guild leadership</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">Advance Notice</h4>
                    <p className="text-gray-400 text-sm">Report absences in advance through the portal</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">No Toxicity</h4>
                    <p className="text-gray-400 text-sm">No toxic behavior or harassment is tolerated</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-shrink-0 mt-1 mr-3 text-green-400">
                    <WuxiaIcon name="checkCircle" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-300">Teamwork</h4>
                    <p className="text-gray-400 text-sm">Support your fellow guild members during events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
