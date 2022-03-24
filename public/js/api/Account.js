/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  URL = '/account';

  static get(id = '', callback){
    createRequest({
      data : null,
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback
    });
  }
}
