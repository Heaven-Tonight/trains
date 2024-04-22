import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionTypes } from '../redux/actions/trainsActions';
import { AppState, Train } from '../redux/types/trainsTypes';
import TrainsListTable from './TrainsListTable';
import TrainCharacteristicTable from './TrainCharacteristicTable';

const url =
    'https://gist.githubusercontent.com/allbel/ae2f8ead09baf7bb66d281e3a6050261/raw/4c898f101913cd7918ab1dbfce008fa12c6d4838/mock.json';
const MainPage = () => {
    const dispatch = useDispatch();
    const trains = useSelector((state: AppState) => state.trains);
    const selectedTrainId = useSelector((state: AppState) => state.activeTrainId);

    useEffect(() => {
        const loadTrainsData = async () => {
            try {
                const response = await fetch(url);
                const trainsData: Train[] = await response.json();
                dispatch({
                    type: ActionTypes.LOAD_TRAINS,
                    payload: trainsData,
                });
            } catch (error) {
                console.error('Error loading trains data:', error);
            }
        };
        loadTrainsData();
    }, [dispatch]);

    return (
        <main>
            <TrainsListTable trains={trains} />
            <TrainCharacteristicTable selectedTrainId={selectedTrainId} />
        </main>
    );
};

export default MainPage;
