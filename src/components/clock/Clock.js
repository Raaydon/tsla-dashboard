import React, { useEffect, useState} from "react"
import './clock.css';


const Clock = () => {

    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            if (String(new Date().getMinutes()).length === 1) {
                var minutes = "0" + new Date().getMinutes();
            } else {var minutes = String(new Date().getMinutes())}

            if (String(new Date().getHours()).length === 1) {
                var hours = "0" + new Date().getHours();
            } else {var hours = String(new Date().getHours())}
            
            var time = hours + ':' + minutes
            setClockState(time);
        }, 1000);
    }, []);
    return (
        <div className="clock-container">
            <div className="clock-inner-ring">
                <div className="clock-numbers">{clockState}</div>
            </div>
        </div>
    )
}
export default Clock