/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsList = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        accountsList.innerHTML='';
        for (let item of response.data) {
          accountsList.insertAdjacentHTML('afterbegin', `<option value="${item.id}">${item.name}</option>`);
        }

      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        const dataIdModal = this.element.closest('.modal').getAttribute('data-modal-id');
        App.getModal(dataIdModal).close();
        App.update();
      }
    });
  }
}