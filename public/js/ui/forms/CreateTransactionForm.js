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
    const incomeAccountsList = document.querySelector('#income-accounts-list');
    const expenseAccountsList =document.querySelector('#expense-accounts-list');
    Account.list(User.current(), (err, response) => {
      if (response.success) {
        for (let item of response.data) {          
          incomeAccountsList.insertAdjacentHTML('afterbegin', `<option value="${item.id}">${item.name}</option>`);
          expenseAccountsList.insertAdjacentHTML('afterbegin', `<option value="${item.id}">${item.name}</option>`);
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