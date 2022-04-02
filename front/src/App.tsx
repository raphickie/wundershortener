import UrlShortenerForm from './components/UrlShortener/UrlShortenerForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AnalyticsComponent from './components/Analytics/AnalyticsComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/analytics/:id" element={<AnalyticsComponent />} />
      </Routes>
    </Router>

  );
}

export default App;
