import './App.css';
import Course from './components/Course';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import CoursePage from './components/CoursePage';
import DemoVideos from './components/DemoVideos';
import About from './components/About';


function App() {
  return (
    <>
      {/* <Home/> */}
      {/* <Course /> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<CoursePage/>}/>
        <Route path="/demo-videos" element={<DemoVideos/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/course-page/:id" element={<Course/>}/>
      </Routes>
    </>
  );
}

export default App;
