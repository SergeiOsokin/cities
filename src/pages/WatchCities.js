import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BtnPage } from '../components/btnPage';
import { ListCities } from '../components/listCities';
import { useHttp } from '../hooks/http.hook';

export const WatchCities = () => {
    const [cities, setCities] = useState([]);
    const [pageQwe, setPage] = useState(1);
    const [countPages, setCountPages] = useState(0);
    const [pagesArr, setpagesArr] = useState([]);
    const [isDisabled, setDisabled] = useState(false);

    const { request } = useHttp();
    const history = useHistory();
    const limit = 5;

    const getCities = useCallback(async (list) => {
        const fetched = await request(`http://localhost:3001/cities/?_page=${list}&_limit=5`);
        setCities(fetched);
    }, [request])
    //по кнопке страницы
    function getCityByPage(page) {
        getCities(page);
        if(page === 1) {
            setPage(1);
            setDisabled(false);
        }
    }
    // по кнопке загрузить города
    function getCityByBtn() {
        if(pageQwe < countPages) {
            console.log(pageQwe)
            getCities(pageQwe + 1);
            setPage(pageQwe + 1);
            return;
        } else {
            setDisabled(true)
            return;
        }
    }
    // при загрузке
    useEffect(() => {
        getCities(pageQwe);
        request(`http://localhost:3001/cities`)
            // .then((res) => {
            //     setCountPages(Math.ceil(res.length / limit));
            // })
    }, [getCities, request])

    function newCity() {
        history.push('/createcity');
    }

    return (
        <div className="watchCities">
            <input className="button buttonAdd" type="button" value={"ДОБАВИТЬ ГОРОД"} onClick={() => newCity()} />
            < ListCities cities={cities} />
            <div className="pagesList">
                {[1, 2, 3].map((item) => {
                    return <i 
                    className="pagesList__pageNumber" 
                    key={item} 
                    onClick={() => { getCityByPage(item) }}
                    >{item}</i>
                })}
            </div>
            < input className="button buttonLoad" type="button" value="ЗАГРУЗИТЬ ГОРОДА" disabled={isDisabled} onClick={() => getCityByBtn()} />
        </div>
    )
}
