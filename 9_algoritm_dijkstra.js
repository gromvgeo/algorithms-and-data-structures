// Алгоритм дейкстры для поиска кратчайшего пути в графе (Dijkstra's algorithm)

// Если в поиске в ширину мы находим кратчайший путь передвигаясь по вершинам графа,
// и не важно длительный этот путь или нет, самое главное это количество пройденных участков,
// то в алгоритме дейкстры учитывается и длина пройеднного ребра, так называемый вес.

// Суть: За стартовую точку принимаем A, за конечную G. Состовляется табличка, в которую на первом этапе
// записываются значения тех вершин, в которые мы можем попасть из стартовой точки. Все остальные
// вершины являются не достижимыми и мы их помечаем знаком бесконечности. На втором этапе мы помечаем эти вершины
// как уже рассмотренные. На третьем этапе мы рассматриваем вершины, в которые мы можем попасть из точек B и C
// и в таблицу записываем значение от точки A, до точек, которые мы достигаем из вершин B и C. Потом опять помечаем эти точки
// как уже рассмотренные. На следующем этапе мы достигаем точки G, но у нас происходит перерасчет, мы находим путь до точки F,
// которая оказывается короче и перезаписываем значение в таблице и на следующем этапе мы проделаем все тоже самое и находим
// самый оптимальный путь и узнаем, что из точки A в точку G мы можем добраться за 5 условных единиц.

const graph = {}
// Цифры это веса ребер (или длина)
graph.a = { b: 2, c: 1 }
graph.b = { f: 7 }
graph.c = { d: 5, e: 2 }
graph.d = { f: 2 }
graph.e = { f: 1 }
graph.f = { g: 1 }
graph.g = {}

function shortPath(graph, start, end) {
  // 1) --------------------------------------------------
  // costs - объект где мы будем хранить кратчайшие пути
  const costs = {}
  // массив, в который мы будем добавлять те узлы, которые мы уже проверили
  const processed = []
  // neighbors - тут храним соседние вершины рассматриваемого узла
  let neighbors = {}
  // Мы должны заполнить таблицу, заполнить те вершины в которые мы можем добраться из
  // стартовой точки значениями, а все остальные мы должны заполнить бесконечно каким-то большим
  // числом.
  // Поэтому у нашего графа получаем список ключей(это будут все вершины) и итерируемся по ним.
  Object.keys(graph).forEach((node) => {
    // Если текущий элемент итерации, то есть вершина не равна стартовой, то
    // мы будем заполнять значения. То есть стартовая вершина в эту табличку не добавляется.
    if (node !== start) {
      // Получаем значение (вес) вершины либо B либо C
      let value = graph[start][node]
      // Затем это значение добавляем в табличку, в которой будут храниться значения кратчайших путей
      costs[node] = value || 100000000
    }
  })

  // 3) --------------------------------------------------
  // Получаем объект с минимальной стоимостью
  let node = findNodeLowestCost(costs, processed)
  // Делаем цикл while, в котором будем крутиться до тех пор, пока эта нода не пустая.
  //

  while (node) {
    // На кажой итерации получаем стоимость текущей вершины
    const cost = costs[node]
    // Те узлы в которые мы можем попасть из этой вершины мы присваиваем в neighbors
    neighbors = graph[node]
    Object.keys(neighbors).forEach((neighbor) => {
      // Высчитываем новую стоимость
      let newCost = cost + neighbors[neighbor]
      //Перезаписываем в таблице значение если новая стоимость меньше
      if (newCost < costs[neighbor]) {
        costs[neighbor] = newCost
      }
    })
    //  Добавляем вершину в массив уже обработанных вершин, после чего при поиске вершин с минимальной
    //  стоимостью эта вершина уже учитываться не будет.
    processed.push(node)
    // И ищем новую вершину.
    node = findNodeLowestCost(costs, processed)
  }
  // Возврашаем объект, который хранит  самые кратчайшие пути.
  return costs
}

// 2) --------------------------------------------------
// На этом этапе необходимо найти вершину, в которую мы можем попасть из точки A
// и путь в которую самый короткий. Название ф-ии "Найти узел с минимальной стоимостью"
function findNodeLowestCost(costs, processed) {
  // lowestCost - будет хранить минимальное значение, по умолчанию 100000000
  let lowestCost = 100000000
  // lowestNode - нода, которую мы будем возвращать с минимальным значением
  let lowestNode
  // Теперь необходимо проитерироваться по ключам объекта в котором мы храним стоимость путей.
  Object.keys(costs).forEach((node) => {
    // Получим стоимость текущей ноды
    let cost = costs[node]
    // Если стоимость, которую мы получили меньше чем минимальная стоимость, которую мы определили в самом начале
    // и вершина которую мы рассматриваем на текущей итерации не находится в массиве обработанных вершин.
    // То есть мы сравниваем стоимость - если она меншьше и если узел еще не обработан, то мы обновляем переменные.
    if (cost < lowestCost && !processed.includes(node)) {
      // Если условие выполнилось, то мы нашли объект у которого путь короче.
      // Соотвественно мы перезаписываем минимальную стоимость на  ту, которую мы сейчас нашли на этой итерации
      // и заменяем ноду.
      lowestCost = cost
      lowestNode = node
    }
  })

  //   Возврашаем вершину с минимальной стоимостью.
  return lowestNode
}

console.log(shortPath(graph, 'a', 'g'))
