/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    let {url, data, method, callback} = options;

    let formData = new FormData();

    if (method === 'GET') {
        url = url + '?';

        for (let key in data) {
            url += key + '=' + data[key] + '&';
        }
        url = url.slice(0, -1);

    } else { 
        for (let key in data) {
            formData.append(key, data[key]);
        };        
    }

    xhr.open(method, url);
    xhr.send(formData);

    try {
        xhr.addEventListener('readystatechange', function () {
          if (this.readyState == xhr.DONE && xhr.status === 200) {
            callback(xhr.response.error, xhr.response);
          }
        });

      } catch (error) {
        callback(error);
      }
    };

