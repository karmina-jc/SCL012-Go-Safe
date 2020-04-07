import React, { useEffect, useState } from 'react';

const CreateDos = () => {

    const [position, setPosition] = useState (null)

    useEffect(()=>{
        console.log('hola')
        obtenerdatos()
        
    }, [])

    const obtenerdatos = async () => {
        const data = await fetch('http://cre.api.here.com/2/calculateroute.json?waypoint0=50.10951,8.68951&waypoint1=50.10703,8.68222&mode=fastest;car;traffic:disabled&overlays=OVERLAYEXAMPLE1&storage=readonly&app_id=BCARpYuX4JTbLbCE7nfW&app_code=UsxeE6O5hDR3RWxAwgjnDA')
        const ruta = await data.json()
        console.log(ruta)
        setPosition(ruta)
    }

    return(
        <div>
            <h1>Funciona</h1>
        </div>
    )

}


export default CreateDos;