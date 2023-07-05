const authConfig = {
    path:[
        '/api/user/login', 
        /\/api\/articles\/users\/\w+/,
        /\/api\/comments\/article\/\w+/,
        {
          url: '/api/articles/',
          method:['GET']
        },
        {
          url: /\/api\/articles\/\w+/,
          methods: ['GET']
        }, 
        {
          url: '/api/categories/',
          methods: ['GET']
        },
        {
          url: /\/api\/categories\/\w+/,
          methods: ['GET']
        },
        {
          url: '/api/tags/',
          methods: ['GET']
        },
        {
          url: /\/api\/tags\/\w+/,
          methods: ['GET']
        }
    ]
}

module.exports = authConfig