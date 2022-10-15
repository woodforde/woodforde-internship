import React, { useEffect, useState } from 'react';

function ItemTileCountdown({ expiryDate }) {
    const [time, setTime] = useState(Date.now());

    function timeToString() {
        let millisLeft = (expiryDate || time) - time;
        let secondsLeft = millisLeft / 1000;
        let minutesLeft = secondsLeft / 60;
        let hoursLeft = minutesLeft / 60;
        
        return `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(secondsLeft % 60)}s`
    }

    useEffect(() => {
        setInterval(() => {
            setTime(Date.now());
        }, 1000);
    }, [])

    return (
        <div className="de_countdown">{timeToString()}</div>
    );
}

export default ItemTileCountdown;
