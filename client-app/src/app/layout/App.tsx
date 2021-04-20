import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import { useQueryClient } from 'react-query';

import {  setSelectedActivity, setEditMode, HOTEL_LIST, QUERY_PARAMS } from '../store/ActivityStore';
import { useState } from 'react';

function App() {

  const queryClient = useQueryClient()

  const dummy = {
    isLoading: false,
    activities: [],
  };

  const { isLoading, activities } = dummy //useActivities(); //vrati

  const [params, setParam] = useState({});





  const handleSelectActivity = (name: String) => {
    //setSelectedActivity(activities?.find(x => x.name === name), queryClient); vrati
  }

  const handleCancelActivity = () => {
    setSelectedActivity(undefined, queryClient);
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelActivity();
    setEditMode(true, queryClient);
  }
  const handleFormClose = () => {
    setEditMode(false, queryClient);
  }

  /*   const handleCreateOrEditActivity = (activity: Activity) => {
      setSubmitting(isLoading, queryClient);
      if (activity.id) {
        agent.Activities.update(activity).then(() => {
          queryClient.invalidateQueries(ACTIVITY_LIST)
          setSelectedActivity(activity, queryClient)
          setEditMode(false, queryClient)
          setSubmitting(isLoading, queryClient)
        })
      } else {
        activity.id = uuid();
        agent.Activities.create(activity).then(() => {
          queryClient.invalidateQueries(ACTIVITY_LIST)
          activities?.push(activity);
          setSelectedActivity(activity, queryClient)
          setEditMode(false, queryClient)
          setSubmitting(false, queryClient)
        })
      }
    } */

  if (isLoading) return <LoadingComponent content='Loading app' />


  const loadHotels = (queryData: any) => {
    //console.log(queryData);
    // setQueryParams(queryData, queryClient);
    setParam(queryData)
  }


  return (



    <div className="App">
      {/*  <Header as='h2' icon='users' content='GardenWiz' /> */}
      <NavBar openForm={handleFormOpen} loadHotels={loadHotels} />
      <Container style={{ marginTop: '10em' }}>
        {<ActivityDashboard

          cancelActivity={handleCancelActivity}
          //openForm={handleFormOpen}
          closeForm={handleFormClose}

        //  params={clientQuery}
        //createOrEdit={createOrEditActivityHandler}

        />}
      </Container>
    </div>
  );
}

export default App;
