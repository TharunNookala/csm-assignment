import './App.css';
import AppLayout from './components/AppLayout/AppLayout';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="w-screen h-screen p-2 text-[#2B2A6C] flex flex-col justify-center">
      <Header />
      <AppLayout />
    </div>
  );
}

export default App;
