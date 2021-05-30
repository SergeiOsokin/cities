import React from 'react';
import { Link } from 'react-router-dom';

export const ListCities = ({ cities }) => {
    return (
        <div className="cityContainer">
            {cities.map((item) => {
                return (
                    <Link className="cityContainer__cityLink" key={item.id} idcity={item.id} to={`changecity/${item.id}`} >{item.nameRu}
                    </Link>
                )
            })}
        </div>
    )
}