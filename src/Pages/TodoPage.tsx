import React, { useState } from 'react'

import { v4 } from 'uuid';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { stateType } from '../Utils/global';
import { useEffect } from 'react';
import _ from 'lodash';
import Modal from "../Components/modal";


import { motion } from "framer-motion";
import { MdDeleteSweep } from 'react-icons/md';
import { TiInfo } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { ImPlus } from "react-icons/im";


export default function TodoPage() {
    const data: any = localStorage.getItem("inputs");
    var dataJson = JSON.parse(data);

    const defaultState = {
        opacity: 0,
        scale: 0.6
    };

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
    const [color, setColor] = useState<string>("#1dd1a1")

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
                            damping: 400
                        }}
                    ><ImPlus onClick={addItem} /></motion.button>
                </form>
            </div>
            <div className="task-area">
                {state.todo.items.map((data, index) => {
                    return (
                        <motion.div initial={defaultState}
                            exit={defaultState}
                            animate={{
                                opacity: 1,
                                boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.3)",
                                scale: 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 1000
                            }}
                            className="task" key={index} style={{ backgroundColor: data.status ? `${color}` : "", transition: "0.5s ease-in-out" }}>
                            <div className="task-title">
                                <h5>{data.name}</h5>
                            </div>
                            <div className="task-icons">
                                <MdDeleteSweep className="iconDelete icon" onClick={() => removeTask(data.id)} />
                                <div className="tooltip">
                                    <TiInfo className="iconInfo icon" />
                                    <span
                                        className="tooltip-Text">Was Created {data.date} / {data.hour}</span>
                                </div>

                                <FaPencilAlt className="iconPencil icon" onClick={() => { openModal(data.id) }} />
                                <AiOutlineFileDone className="iconDone icon" onClick={() => taskComplete(index)} />
                            </div>
                        </motion.div>
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
