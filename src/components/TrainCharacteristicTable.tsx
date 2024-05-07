import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { AppState, Characteristic, Train } from '../redux/types/trainsTypes';
import { ActionTypes } from '../redux/actions/trainsActions';
interface TrainCharacteristicTableProps {
    selectedTrainId: number | null;
}

const isValidNumber = (columnName: string, value: number)=> {
    switch (columnName) {
        case 'speed': {
            return Number.isInteger(value) && value >= 0;
        }
        case 'force': {
            return value > 0;
        }
        case 'engineAmperage': {
            return Number.isInteger(value) && value > 0;
        }
        default: {
            console.log(`Unexpected columnName ${columnName}`);
        }
    }
};

const TrainCharacteristicTable: React.FC<TrainCharacteristicTableProps> = ({ selectedTrainId }: TrainCharacteristicTableProps) => {
    const [trainDetails, setTrainDetails] = useState<Characteristic[]>([]);
    const [isValidTableState, setIsValidTableState] = useState(false);
    const [invalidCells, setInvalidCells] = useState<{ [key: string]: boolean[] }>({
        engineAmperage: [],
        speed: [],
        force: [],
    });
    const dispatch = useDispatch();

    const selectInputValue = (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input instanceof HTMLInputElement) {
            input.select();
        }
    };

    const handleInputChange = (index: number, key: keyof Characteristic, value: string) => {
        const updatedDetails: Characteristic[] = [...trainDetails];
        updatedDetails[index] = { ...updatedDetails[index], [key]: Number(value) };
        setTrainDetails(updatedDetails);

        const inputNumberIsValid = isValidNumber(key, Number(value));

        setInvalidCells((prevState) => {
            const updatedInvalidCells = { ...prevState, [key]: { ...prevState[key], [index]: !inputNumberIsValid } };
            const newIsValidTableState = !Object.values(updatedInvalidCells).some((cell) => Object.values(cell).includes(true));
            setIsValidTableState(newIsValidTableState);
            return updatedInvalidCells;
        });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValidTableState) return;

        dispatch({
            type: ActionTypes.UPDATE_TRAIN,
            payload: trainDetails,
        });

        const input = document.activeElement as HTMLInputElement;
        if (input) {
            input.blur();
        }

        const listSortedBySpeed: Characteristic[] = [...trainDetails]
            .sort((a, b) => a.speed - b.speed);
        console.log(`Список скоростных ограничений Поезда №${selectedTrainId}`, listSortedBySpeed);
    };

    useEffect(() => {
        const initialTrainDetailsState = selectedTrainId !== null ? trains[selectedTrainId].characteristics : [];
        setIsValidTableState(false);
        setTrainDetails(initialTrainDetailsState);
        setInvalidCells({
            engineAmperage: Array(initialTrainDetailsState.length).fill(false),
            speed: Array(initialTrainDetailsState.length).fill(false),
            force: Array(initialTrainDetailsState.length).fill(false),
        });
    }, [selectedTrainId]);

    const trains: Train[] = useSelector((state: AppState) => state.trains);

    return (
        <div className="train-details-table-wrapper">
            {trainDetails.length > 0 && (
                <form noValidate onSubmit={handleSubmit}>
                    <table className="train-details-table">
                        <caption className="table-caption">Характеристики</caption>
                        <caption>{selectedTrainId !== null && trains[selectedTrainId].name}</caption>
                        <thead>
                        <tr>
                            <th>Ток двигателя</th>
                            <th>Сила тяги</th>
                            <th>Скорость</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trainDetails.map(({ speed, force, engineAmperage }, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="number"
                                        value={engineAmperage}
                                        className={invalidCells.engineAmperage[index] ? 'invalid-cell' : ''}
                                        onClick={selectInputValue}
                                        onChange={(e) => handleInputChange(index, 'engineAmperage', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className={invalidCells.force[index] ? 'invalid-cell' : ''}
                                        value={force}
                                        onClick={selectInputValue}
                                        onChange={(e) => handleInputChange(index, 'force', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={speed}
                                        className={invalidCells.speed[index] ? 'invalid-cell' : ''}
                                        onClick={selectInputValue}
                                        onChange={(e) => handleInputChange(index, 'speed', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button type="submit" className={!isValidTableState ? 'disabled' : ''}>
                        Отправить данные
                    </button>
                </form>
            )}
        </div>
    );
};
export default TrainCharacteristicTable;
