/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData;

    let method = options.method;
    let url = options.url;
    let data = options.data;

    if (method === 'GET') {
        url = url + '?' + 'mail=' + data.email + '&' + 'password=' + data.password;

    } else {
        formData.append('mail', data.email);
        formData.append('password', data.password);

        /*
        for (let key in data) {
            formData.append(key, data[key]);
        }
        */
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
      }
    catch (e) {
    // перехват сетевой ошибки
        options.callback(e);
    }

    xhr.onload = function() {
        //let error = null;
        if(xhr.status === 200) {
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.response.error);
        }
    }
};
