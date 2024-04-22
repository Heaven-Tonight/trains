import React from 'react';
import { useDispatch } from 'react-redux';

import { Train } from '../redux/types/trainsTypes';
import { ActionTypes } from '../redux/actions/trainsActions';

interface TrainsListProps {
    trains: Train[];
}

const TrainsList: React.FC<TrainsListProps> =  ({ trains }: TrainsListProps) => {
    const dispatch = useDispatch();
    const openTrainDetails = (index: number) => () => {
        dispatch({
            type: ActionTypes.SELECT_TRAIN,
            payload: index,
        });
    };

    return (
            <table className="trains-list-table">
                <caption className="table-caption">Поезда</caption>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Описание</th>
                </tr>
                </thead>
                <tbody>
                {trains.map(({ name, description}, index) => (
                    <tr key={index} onClick={openTrainDetails(index)}>
                        <td>{name}</td>
                        <td>{description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
    );
};

export default TrainsList;
