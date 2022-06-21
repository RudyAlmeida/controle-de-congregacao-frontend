export const environment = {
  production: true,
  paths: {
    users: {
      userRoutes: 'https://controle-de-congreg-backend.herokuapp.com/user/',
      userLogin: 'https://controle-de-congreg-backend.herokuapp.com/user/login/',
      userByCongragation: 'https://controle-de-congreg-backend.herokuapp.com/user/congregation/',
    },
    superUsers: {
      superUserRoutes: 'https://controle-de-congreg-backend.herokuapp.com/superUsers/',
      superUserLogin: 'https://controle-de-congreg-backend.herokuapp.com/superUsers/login/',
    },
    congregation: {
      congregationRoutes: 'https://controle-de-congreg-backend.herokuapp.com/congregation/'
    }
  }
};
