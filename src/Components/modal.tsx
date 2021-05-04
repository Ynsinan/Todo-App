import _ from 'lodash';
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { stateType } from '../Utils/global'
import { motion } from "framer-motion";
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

                <motion.button
                    initial={{ scale: 1.5 }}
                    exit={{ scale: 0.6 }}
                    animate={{
                        opacity: 1,
                        boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.7)",
                        scale: 1
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 300
                    }}
                    className="change-button"
                    onClick={() => changeTask(id, newTask)}
                >Change</motion.button>
            </div>
        </div>
    )
}
