var axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com';
const headers = {
    'Content-type': 'application/json; charset=UTF-8',
};

const body = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };

function createMyRequest(val, index){
    return axios.get(url+'/users')
    // return axios.post('https://jsonplaceholder.typicode.com/posts', body, headers)
}

function handleResponse(response){
    console.log(response);
}

function handleError(err){
    console.error(err);
}


const promArray = Array(3).fill(3).map((val,idx)=> {
    return createMyRequest(val, idx);
})

Promise.all(promArray).then(res=> {
    res.forEach(r=> {
        handleResponse(r);
    });
}).catch(err=> {
    handleError(err);
});
