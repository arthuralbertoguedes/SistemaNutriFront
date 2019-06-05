const proxy = [
  {
    //Qualquer requisição para localhost:4200/ será encaminhada para o back e evitando  CORS policy
    context: '/api',
    target: 'http://localhost:8080',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
