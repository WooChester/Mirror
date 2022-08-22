import './App.css';
import MainComponent from './components/main_component.js'
import { GlobalStoreContextProvider } from './store'

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
