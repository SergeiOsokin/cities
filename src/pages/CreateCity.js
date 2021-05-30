import React from 'react';
import {CityForm} from '../components/formCityAdd';


export default class CreateCity extends React.Component {
    render() {
        return (
            <div className="formPage">
                <CityForm />
            </div>
        )
    }
}