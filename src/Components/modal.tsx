import _ from 'lodash';
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { stateType } from '../Utils/global'
type modal = {
    id: string;
    onClose: any;
    state: stateType;
    setStorage: any;
}
export default function Modal({ id, onClose, state, setStorage }: modal) {
    const [newTask, setNewTask] = useState<any>();

    const changeTask = (id: string, value: string) => {
        _.map(state, (data) => {
            data.items.map((element) => {
                if (element.id === id) {
                    element.name = value;
                }
                setStorage(state);
                onClose(false);
            });
        });
    };
    return (
        <div className="modal">
            <div className="header">
                <h1 className="modal-title">Change The Task</h1>
                <AiFillCloseCircle
                    className="iconClose"
                    onClick={() => onClose(false)}
                />
            </div>
            <div className="main">
                <input className="changeInput" type="text" placeholder="Change..." onChange={(e: any) => setNewTask(e.target.value)} />
                <button className="change-button" onClick={() => changeTask(id, newTask)}>Change</button>
            </div>
        </div>
    )
}
