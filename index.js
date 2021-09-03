var http = require('http')

function concurrentGetRequests(numberOfRequests){
  for (var i = 0; i < numberOfRequests; i++) {
    var request = {
      hostname: 'httpbin.org',
      headers: {'request-id': i},
      path:'/get'
    }
    http.get(request, (res) => {
        var body = ''
        res.on('data', function (chunk) {
          body += chunk
        })
        res.on('end', function () {
          console.log(JSON.parse(body).headers['Request-Id'])
        })
    }).end()
  }
}

function concurrentPostRequests(numberOfRequests){
    for (var i = 0; i < numberOfRequests; i++) {
      var request = {
        hostname: 'httpbin.org',
        headers: {'request-id': i},
        path: '/post',
        body: {number: i},
        method:'POST'
      }
      http.get(request, (res) => {
          let body = ''
          res.on('data', function (chunk) {
            body += chunk
          })
          res.on('error', ()=> {
              console.error(JSON.parse(res));
          })
          res.on('end', function () {
            console.log(body)
          })

      }).end()
    }
  }


console.log("Running concurrent requests!")
// concurrentGetRequests(3)
concurrentPostRequests(3)
