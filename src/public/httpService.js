class HttpService {
    get(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        // console.log(data);
                        resolve(data);
                    })
                }
            })
            .catch((err) => {
                resolve({
                    status: 500,
                    message: err.message
                })
            });
        });
    }
}

export default HttpService;