/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**    * Устанавливает текущий элемент в свойство element    * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
   constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents()
    } else {
      throw new Error('не передан element');
    }
  }

  /**   * При нажатии на элемент с data-dismiss="modal"    * должен закрыть текущее окно    * (с помощью метода Modal.onClose)   * */
  registerEvents() {
    const modals = this.element.querySelectorAll('[data-dismiss="modal"]');
    modals.forEach(item => item.addEventListener('click', this.onClose()));
  }

  /**   * Срабатывает после нажатия на элементы, закрывающие окно.   * Закрывает текущее окно (Modal.close())   * */
  onClose(e) {    
    e.target.addEventListener('click', () => this.element.close());
  }
  /**   * Открывает окно: устанавливает CSS-свойство display   * со значением «block»   * */
  open() {
    this.element.style.display = 'block';
  }
  /**   * Закрывает окно: удаляет CSS-свойство display   * */
  close() {
    this.element.style.display = '';
  }
}