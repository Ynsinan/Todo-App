import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useInput } from '../Hooks/useInput';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { motion } from "framer-motion";

export default function Login() {
    const INITIAL_STATE = {
        name: "",
        lastName: ""
    };
    const [storage, setStorage] = useLocalStorage('inputs', INITIAL_STATE)

    const [inputs, setInputs] = useInput(storage);//localStorageInputs değeri yoksa ınıtıal yazılacak 
    const data: any = localStorage.getItem("inputs");
    var dataJson = JSON.parse(data);
    console.log(dataJson);


    useEffect(() => {
        setStorage(inputs);
    }, [inputs])
    const history = useHistory();

    const onClick = () => {
        if (inputs.name.length < 2 || inputs.lastName.length < 2) {
            alert("name/lastname must be at least 2 characters");
        } else {
            history.push("/home");
        }
    };

    return (
        <motion.div className="login-container"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 300
            }}>
            <div className="name-container">
                <h4>Name</h4>
                <input type="text" name="name" placeholder=" Enter your name" value={inputs.name} onChange={setInputs} />
            </div>
            <div className="lastName-container">
                <h4>Last Name</h4>
                <input type="text" name="lastName" placeholder=" Enter your last name" value={inputs.lastName} onChange={setInputs} />
            </div>
            <motion.button onClick={onClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 1 }}  >Login</motion.button>


        </motion.div>
    )
}
