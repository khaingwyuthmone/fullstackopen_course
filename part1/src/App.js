import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';

function App() {
  console.log(`Component ${App.name} is called.`);
  const friends = [ 'Peter', 'Maya']

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}

export default App;
