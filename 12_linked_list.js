// Структура данных: Связанный список (Linked List)
// Связанный список - каждый отдельно взятый элемент списка занимает отдельное место  в памяти.
// Связанность списка происходит за счет того, что каждый пердыдущий элемент хранит ссылку на следующий элемент,
// который лежит в списке. Плюс такого подхода в том, что мы можем мгновенно добавлять элементы в конец или в начало
// списка. А минус в том, что чтобы получить какой-то элемент - нам с самого начала списка надо итерироваться и сравнивать.
// Таким образом список больше подходит в том случае если мы редко обращаемся к каким-то данным и часто его дополняем.

// Суть: каждый предыдущий элемент ссылается на последующий

class LinkedList {
  constructor() {
    // Размер самого списка
    this.size = 0
    //Корневой элемент
    this.root = null
  }

  add(value) {
    if (this.size === 0) {
      // Если размер равен 0 тогда создаем корневой элемент
      this.root = new Node(value)
      this.size += 1
      // Прекращаем выполнение ф-ии
      return true
    }

    let node = this.root
    // Крутимся в цикле до тех пор пока в ноде есть следующий жоемент
    while (node.next) {
      // Присваеваем следующий элемент переменной node
      node = node.next
    }
    // После того как дошли до последнего элемента в списке, создаем новую ноду
    let newNode = new Node(value)
    // Указываем ссылку на новую ноду последнему элементу
    node.next = newNode
    this.size += 1
  }

  getSize() {
    return this.size
  }

  print() {
    let result = []
    let node = this.root
    while (node) {
      result.push(node.value)
      node = node.next
    }
    console.log(result)
  }
}

// Класс для отдельного узла
class Node {
  constructor(value) {
    this.value = value
    // Будет хранить ссылку на следующий элемент в списке
    this.next = null
  }
}

const list = new LinkedList()
list.add(5)
list.add(3)
list.add(2)
list.add(5)
list.add(7)

list.print()