import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useInput } from '../Hooks/useInput';
import { useLocalStorage } from '../Hooks/useLocalStorage';

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
        <div className="login-container">
            <div className="name-container">
                <h4>Name</h4>
                <input type="text" name="name" placeholder=" Enter your name" value={inputs.name} onChange={setInputs} />
            </div>
            <div className="lastName-container">
                <h4>Last Name</h4>
                <input type="text" name="lastName" placeholder=" Enter your last name" value={inputs.lastName} onChange={setInputs} />
            </div>
            <button onClick={onClick}>Login</button>


        </div>
    )
}
