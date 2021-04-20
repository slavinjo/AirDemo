import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { HotelDashboard } from '../../features/activities/dashboard/HotelDashboard';

function App() {
  const handleCancelActivity = () => {
    //setSelectedActivity(undefined, queryClient);
  }
  const handleFormOpen = (id?: string) => {
    //    id ? handleSelectActivity(id) : handleCancelActivity();
    //  setEditMode(true, queryClient);
  }
  const handleFormClose = () => {
    //setEditMode(false, queryClient);
  }

  return (
    <div className="App">
      <NavBar />
      <Container style={{ marginTop: '10em' }}>
        {<HotelDashboard
          cancelActivity={handleCancelActivity}
        />}
      </Container>
    </div>
  );
}

export default App;
