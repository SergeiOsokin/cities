import {useCallback} from 'react';

export const useHttp = () => {

    const request = useCallback(async (url, method = 'GET', body1 = null, header = {}) => {
        const body = JSON.stringify(body1);
        const params = method === 'GET' ? { method, headers: header } : { method, body, headers: header };
        try{
            const response = await fetch(url, params);
            const data = await response.json(); // получаем ответ
            
            if(!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так');
            }
            return data;
        } catch(e){
            throw e;
        }
    }, [])

    return {
        request,
    }
}