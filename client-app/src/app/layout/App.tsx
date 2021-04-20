import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { HotelDashboard } from '../../features/activities/dashboard/HotelDashboard';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: '10em' }}>
        {<HotelDashboard />}
      </Container>
    </div>
  );
}

export default App;
