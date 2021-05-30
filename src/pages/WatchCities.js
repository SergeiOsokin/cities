import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ListCities } from '../components/listCities';
import { useHttp } from '../hooks/http.hook';

export const WatchCities = () => {
    const [cities, setCities] = useState([]);
    const { request } = useHttp();
    const history = useHistory();

    const getCities = useCallback( async () => {
        const fetched = await request('http://localhost:3001/cities/?_page=1&_limit=2');
        console.log(fetched)
        setCities(fetched);
    }, [request])

    function openMoreCity() {
        console.log(cities)
    }

    useEffect(() => {
        getCities();
    }, [getCities])

    function newCity() {
        history.push('/createcity');
    }

    return (
        <div className="watchCities">
            <input className="button buttonAdd" type="button" value={"ДОБАВИТЬ ГОРОД"} onClick={() => newCity()} />
            <ListCities cities={cities} />
            <input className="button buttonLoad" type="button" value="ЗАГРУЗИТЬ ГОРОДА" onClick={() => openMoreCity()} />
        </div>
    )
}
