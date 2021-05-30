import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';

export const CityFormChange = () => {
    const { request } = useHttp();
    const { id } = useParams()
    const [city, setCityInfo] = useState({
        nameRu: "",
        nameEn: "",
        fontSize: "",
        color: ""
    });

    function handleChange(event) {
        setCityInfo({
            ...city, [event.target.name]: event.target.value
        })
    }

    const getCity = useCallback( async () => {
        const fetched = await request(`http://localhost:3001/cities/${id}`);
        console.log(fetched)
        setCityInfo({
            nameRu: fetched.nameRu,
            nameEn: fetched.nameEn,
            fontSize: fetched.fontSize,
            color: fetched.color
        });
    }, [request, id])

    useEffect(() => {
        getCity();
    }, [getCity])

    function submitHandler(event) {
        event.preventDefault();
        console.log(city)

        request(`http://localhost:3001/cities/${id}`, 'PATCH', {
            nameRu: city.nameRu,
            nameEn: city.nameEn,
            fontSize: city.fontSize,
            color: city.color
        },
            {
                "Content-Type": "application/json"
            }
        )
            .then((res) => alert('Успех'))
            .catch((err) => alert(err))
    }
    return (
        <>
            <p className="titleNewCity">Новый город</p>
            <form className="formCity" onSubmit={submitHandler}>
                <fieldset>
                    <input className="input" type="text" name="nameRu" value={city.nameRu} onChange={handleChange} />
                    <input className="input" type="text" name="nameEn" value={city.nameEn} onChange={handleChange} />
                    <label htmlFor="fontSize">Кегель</label>
                    <select id="fontSize" className="input" name="fontSize" value={city.fontSize} onChange={handleChange} >
                        <option defaultValue>160</option>
                        <option>140</option>
                        <option>120</option>
                        { }
                    </select>
                    <label htmlFor="color">Цвет*</label>
                    <input id="color" className="input" type="color" name="color" value={city.color} onChange={handleChange} />
                    <label htmlFor="file">Картинка города*</label>
                    <input id="file" type="file" />
                    <input className="button buttonSaveCity" type="submit" value="сохранить" />
                </fieldset>
            </form>
        </>
    )
}
