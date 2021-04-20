import { useQueryClient } from 'react-query'
import { Grid } from 'semantic-ui-react'
import { Hotel } from '../../../app/model/Hotel'
import { SELECTED_ACTIVITY, SUBMITTING, useHotels, useEditMode, useQueryParams } from '../../../app/store/ActivityStore'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { ActivityList } from './ActivityList'
import '../../../app/layout/styles.css';
import { LoadingComponent } from '../../../app/layout/LoadingComponent'


interface Props {
    cancelActivity: () => void;
    //openForm: (id: string) => void;
    closeForm: () => void;
    //createOrEdit: (activity: Activity) => void;

    //  params: any;

}

export const ActivityDashboard = ({ cancelActivity, closeForm, /*params*/ }: Props) => {
    //const { data: activities } = useQuery<Activity[], Error>('activities');
    //const activities = undefined; //useActivities();
    const queryClient = useQueryClient()


    //const [edit, setEdit] = useState<boolean | undefined>(queryClient.getQueryData(EDIT_MODE))



    //let activities: Hotel[] | undefined = undefined;// = queryClient.getQueryData(ACTIVITY_LIST);
    //const params = queryClient.getQueryData(QUERY_PARAMS);



    const selectedActivity = queryClient.getQueryData<Hotel | undefined>(SELECTED_ACTIVITY) //useQuery<Activity>(SELECTED_ACTIVITY);
    const submitting: boolean | undefined = queryClient.getQueryData(SUBMITTING)

    const { isEditMode } = useEditMode();

    //const queryParams = queryClient.getQueryData(QUERY_PARAMS) //useQueryParams()

    //const [queryParams, setQueryParams] = useState(useQueryParams())

    //const { isLoading, activities } = useActivities() //params); //vrati

    const { queryParams } = useQueryParams()
    //const { isLoading, error, activities } = useActivities(queryParams);

    const { isLoading, activities, error, isFetching } = useHotels(queryParams);

    //const [activities, setActivities] = useState(undefined)
    //  const [activities, setActivities] = useState<Hotel[]>()
    //  const { queryParams } = useQueryParams()

    /*    useEffect(() => {
           console.log("efekt")
           console.log(JSON.stringify(queryParams))
   
           return () => {
   
           }
       }, [activities, queryParams]) */

    /*     useEffect(
            () => {
            console.log("efekt")
            //console.log(JSON.stringify(queryParams))
          
            return () => {
    
    
            }
        }, [queryParams]) */


    /*   const callback = () => {
          setEdit(queryClient.getQueryData(EDIT_MODE))
      } */

    if (isFetching) return <LoadingComponent content='Loading hotels' />

    return (

        <Grid>
            <Grid.Column width='10' >
                <ActivityList
                    hotels={activities}
                    //  selectActivity={selectActivity}
                    submitting={submitting}


                />
            </Grid.Column>
            <Grid.Column width='6' >
                {selectedActivity && !isEditMode &&
                    < ActivityDetails
                        cancelActivity={cancelActivity}

                    />
                }
                {isEditMode &&
                    <ActivityForm
                        closeForm={cancelActivity}

                    />
                }

            </Grid.Column>
        </Grid>
    )
}
