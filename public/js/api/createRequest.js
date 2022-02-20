/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';
    try {
        if (options.method === 'GET') {
            let way = options.url + '?';
            Object.entries(options.data).map(([key, value]) => way = way + key + '=' + value + '&');
            way = way.slice(0, -1);
            xhr.open('GET', way);
            xhr.send();
        } else {
            const formData = new FormData;
            Object.entries(options.data).map(([key, value]) => formData.append(key, value));

            xhr.open('POST', options.url);
            xhr.send(formData);
        }
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readystate && xhr.status === 200) {
                options.callback(null, xhr.response);
            };
        });
    }
    catch (e) {
        options.callback(e);
    }
};


