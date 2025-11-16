
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';

import DashboardPage from './features/dashboard/DashboardPage';
import UsersPage from './features/users/UsersPage';
import AwardsPage from './features/awards/AwardsPage';
import BansPage from './features/bans/BansPage';
import FixturesPage from './features/fixtures/FixturesPage';
import FixtureGenerationPage from './features/fixture-generation/FixtureGenerationPage';
import StatsPage from './features/stats/StatsPage';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex h-screen bg-gray-900">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
              <PageWrapper>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/awards" element={<AwardsPage />} />
                  <Route path="/bans" element={<BansPage />} />
                  <Route path="/fixtures" element={<FixturesPage />} />
                  <Route path="/fixture-generation" element={<FixtureGenerationPage />} />
                  <Route path="/stats" element={<StatsPage />} />
                </Routes>
              </PageWrapper>
            </main>
          </div>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
