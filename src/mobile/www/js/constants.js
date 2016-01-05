angular.module('starter.constants', [])
  .constant('apiUrl', 'http://localhost:8000')
  .value('babyA', {
    name: 'Baby A',
    id: '123'
  })
  .value('babyB', {
    name: 'Baby B',
    id: '456'
  });
