import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Banner from './Components/Banner';
import IdeasPage from './Pages/Idea';

function App() {
  return (
    <Router>
      <div className="bg-gray-100">
        <Header />
        <main>
          <div className="relative"> 
             <Banner />
             <Routes>
               <Route path="/" element={<IdeasPage />} />
               <Route path="/work" element={<div>Work Page</div>} />
               <Route path="/about" element={<div>About Page</div>} />
             </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App