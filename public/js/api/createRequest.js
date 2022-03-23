/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    if (options.method === 'GET' && options.data) {
        let way = options.url + '?';
        Object.entries(options.data).map(([key, value]) => way = way + key + '=' + value + '&');
        way = way.slice(0, -1);
        xhr.open('GET', way);
        xhr.send();
    } else if (options.data) {
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


};

/*createRequest({
    url: '/user/current',
    data: {
        email: 'demo@demo',
        password: 'demo1'
    },
    method: 'GET',
    callback: (e,r) => {
        connsole.log("r=",r)
    }
})*/




