import './App.css';
import MainComponent from './components/main.js';
import { GlobalStoreContextProvider } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <GlobalStoreContextProvider>
        <MainComponent/>
      </GlobalStoreContextProvider>
      
    </div>
  );
}

export default App;
