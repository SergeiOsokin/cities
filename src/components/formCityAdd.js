import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const CityForm = () => {
    //для запросов на сервер
    const { request } = useHttp();
    const [city, setCity] = useState({
        nameRu: "",
        nameEn: "",
        fontSize: "160",
        color: ""
    });
    const [colorAvailable, setColor] = useState([
        '#F56F6F', '#ECAC62', '#F4E38A', '#CA8BA9', '#749BF8', '#FFC8EF', '#FFD2C8', '#A2E3FF', '#C8CCDC', '#0BC5D1', '#9EE2A8', '#C8EC62', '#CCCD9E'
    ])
    //установим состояние для отправки на сервер
    function handleChange(event) {
        if (event.target.getAttribute('name') === 'color') {
            return setCity({
                ...city, color: `${event.target.getAttribute('value')}`
            })
        }
        setCity({
            ...city, [event.target.name]: event.target.value
        })
    }
    //отправим новый город на сервер
    function submitHandler(event) {
        event.preventDefault();
        console.log(city)

        request('http://localhost:3001/cities', 'POST', {
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
            <form className="formCity" onSubmit={submitHandler}>
                <p className="titleNewCity">Новый город</p>
                <fieldset>
                    <div className="container-input">
                        <label className="input-label" htmlFor="nameRu">Город (RU)*</label>
                        <input className="input" type="text" name="nameRu" value={city.nameRu} onChange={handleChange} id="nameRu" />
                    </div>
                    <div className="container-input">
                        <label className="input-label" htmlFor="nameEn">Город (ENG)*</label>
                        <input className="input" type="text" name="nameEn" value={city.nameEn} onChange={handleChange} id="nameEn" />
                    </div>
                    <div className="container-input container-input_select">
                        <label className="input-label input-label_select" htmlFor="fontSize">Кегель</label>
                        <select id="fontSize" className="input" name="fontSize" value={city.fontSize} onChange={handleChange} >
                            <option defaultValue>160</option>
                            <option>140</option>
                            <option>120</option>
                            { }
                        </select>
                    </div>
                    <div className="colors-container">
                        <div className="input-label input-label_select">Цвет*</div>
                        {colorAvailable.map((item, index) => {
                            return (
                                <div className="container-color" key={item}>
                                    <input
                                        className="color"
                                        type="radio"
                                        name="color"
                                        onClick={handleChange}
                                        key={index + item + 'radio'}
                                        id={item}
                                        value={item}
                                    />
                                    <label
                                        className={`colorLabel`}
                                        style={{ backgroundColor: item }}
                                        htmlFor={item}
                                        key={item + index + 'label'}
                                    >
                                    </label>

                                </div>
                            )
                        })}
                    </div>
                    <div className="container-input-file">
                        <label className="" htmlFor="file">Картинка города*</label>
                        <label className="container-input container-input_select" htmlFor="file">
                            <span className="input_file">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16" color='#D0BF9D'>
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                </svg>
                                <p className="text-load">ЗАГРУЗИТЬ</p>
                            </span>
                        </label>
                        <input className="file-input" id="file" type="file" />
                    </div>
                    <input className="button buttonSaveCity" type="submit" value="сохранить" />
                </fieldset>
            </form>
        </>
    )
}
