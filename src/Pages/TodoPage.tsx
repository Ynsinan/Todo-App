import React, { useState } from 'react'
import { MdDeleteSweep } from 'react-icons/md';
import { TiInfo } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { ImPlus } from "react-icons/im";
import { v4 } from 'uuid';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { stateType } from '../Utils/global';
import { useEffect } from 'react';
import _ from 'lodash';
import Modal from "../Components/modal";


export default function TodoPage() {
    const data: any = localStorage.getItem("inputs");
    var dataJson = JSON.parse(data);

    const item = {
        id: v4(),
        name: "Learn",
        date: "11.23.2021",
        hour: "09.05",
        status: false,
    }
    const item2 = {
        id: v4(),
        name: "Learn everything",
        date: "11.23.2021",
        hour: "09.05",
        status: false,
    }

    const DEFAULT_TODO = {
        todo: {
            title: "Todo",
            items: [item, item2]
        }
    }

    const [storage, setStorage] = useLocalStorage("todo", DEFAULT_TODO);
    const [state, setState] = useState<stateType>(storage);
    const [text, setText] = useState<string | undefined>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [temp, setTemp] = useState<string>("");
    const [color, setColor] = useState<string>("green")

    let time = new Date();

    const addItem = (e: any) => {
        e.preventDefault();
        if (text) {
            if (text.length < 30) {
                if (state.todo.items.length < 9) {
                    state.todo.items.push({
                        id: v4(),
                        name: text,
                        date: time.toLocaleDateString(),
                        hour: time.toLocaleTimeString(),
                        status: false,
                    });
                } else {
                    alert("Todo list full");
                }
                setStorage(state);
                setText("");
            } else {
                alert("Task's name very long");
            }
        } else {
            return;
        }
    }
    const removeTask = (id: string) => {
        _.map(state, (data) => {
            data.items = data.items.filter((data) => data.id !== id);
        })
        setStorage({ ...state })
    }

    const openModal = (id: string) => {
        setModalIsOpen(true);
        setTemp(id);
    }

    const taskComplete = (id: number) => {
        const newArray = [...state.todo.items];
        newArray[id].status = !newArray[id].status;
        setStorage({ ...state })
        console.log(newArray);
    }

    useEffect(() => {
        setState(storage);
    }, [storage])

    return (
        <div className="todo-container">
            <div className="name-tag">
                <h1>{dataJson.name}'s Todo List</h1>
            </div>
            <div className="input-area">
                <form action="" onSubmit={addItem}>
                    <input type="text" value={text} placeholder="Do you plan to do something anymore" onChange={(e) => setText(e.target.value)} />
                    <button><ImPlus onClick={addItem} /></button>
                </form>
            </div>
            <div className="task-area">
                {state.todo.items.map((data, index) => {
                    return (
                        <div className="task" key={index} style={{ backgroundColor: data.status ? `${color}` : "" }}>
                            <div className="task-title">
                                <h5>{data.name}</h5>
                            </div>
                            <div className="task-icons">
                                <MdDeleteSweep className="iconDelete icon" onClick={() => removeTask(data.id)} />
                                <div className="tooltip">
                                    <TiInfo className="iconInfo icon" />
                                    <span className="tooltip-Text">Was Created {data.date} / {data.hour}</span>
                                </div>

                                <FaPencilAlt className="iconPencil icon" onClick={() => { openModal(data.id) }} />
                                <AiOutlineFileDone className="iconDone icon" onClick={() => taskComplete(index)} />
                            </div>
                        </div>
                    )
                })}
            </div>
            {modalIsOpen && (
                <>
                    <Modal id={temp} state={state} setStorage={setStorage} onClose={setModalIsOpen} />
                </>
            )}

        </div>
    )
}
