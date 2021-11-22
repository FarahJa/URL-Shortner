import './App.css';
import { Grid } from '@material-ui/core';
import Header from './components/Header'; 
import Search from './components/Search';

function App() {
  return (
    <Grid className="App" container direction='column' justify='center' alignItems='center'>
      <Header/>
      <Search/>
    </Grid>
  );
}

export default App;
