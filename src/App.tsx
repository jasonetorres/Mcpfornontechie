import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Demo from './pages/Demo';
import Examples from './pages/Examples';
import Resources from './pages/Resources';
import Templates from './pages/Templates';
import Community from './pages/Community';
import Guides from './pages/Guides';
import TalkResources from './pages/TalkResources';
import StartBuilding from './pages/StartBuilding';
import PlatformComparison from './pages/PlatformComparison';
import OfficeHours from './pages/OfficeHours';
import SuccessStories from './pages/SuccessStories';
import RequestTemplate from './pages/RequestTemplate';
import SubmitTemplate from './pages/SubmitTemplate';
import JoinCommunity from './pages/JoinCommunity';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/community" element={<Community />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/talk-resources" element={<TalkResources />} />
          <Route path="/start-building" element={<StartBuilding />} />
          <Route path="/platform-comparison" element={<PlatformComparison />} />
          <Route path="/office-hours" element={<OfficeHours />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/request-template" element={<RequestTemplate />} />
          <Route path="/submit-template" element={<SubmitTemplate />} />
          <Route path="/join-community" element={<JoinCommunity />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;