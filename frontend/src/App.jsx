import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import UseCases from './components/UseCases.jsx';
import Workflow from './components/Workflow.jsx';
import TechStack from './components/TechStack.jsx';
import Metrics from './components/Metrics.jsx';
import Literature from './components/Literature.jsx';
import Team from './components/Team.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="noise">
      <Navbar />
      <main>
        <Hero />
        <UseCases />
        <Workflow />
        <TechStack />
        <Metrics />
        <Literature />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
