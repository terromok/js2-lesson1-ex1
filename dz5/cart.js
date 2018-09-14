function buildCart() {
  // Очищаем корзину
  $('#cart').empty();
  // Отправляем запрос на получение списка товаров в корзине
  $.ajax({
    url: 'http://localhost:3000/cart',
    dataType: 'json',
    success: function(cart) {
      // Создаем ul - элемент
      var $ul = $('<ul />');
      // Переменная для хранения стоимости товаров в корзине
      var amount = 0;

      // Перебираем товары
      cart.forEach(function(item) {
        // Создаем товар в списке
        var $li = $('<li />', {
          text: item.name + '(' + item.quantity + ')',
        });

        // Создаем кнопку для удаления товара из корзины
        var $button = $('<button />', {
          text: 'x',
          class: 'delete',
          'data-id': item.id,
          'data-quantity': item.quantity,
        });

        // Суммируем 
        amount += +item.quantity * +item.price;

        // Добавляем все в dom
        $li.append($button);
        $ul.append($li);
      });
      // Добавляем все в dom
      $('#cart').append($ul);
      $('#cart').append('Total: ' + amount + ' rub.')
    }
  })
}

function buildGoodsList() {
  // Очищаем вывод товара
  $('#goods').empty();
  // Запрашиваем список товаров на складе
  $.ajax({
    url: 'http://localhost:3000/goods',
    dataType: 'json',
    success: function(cart) {
      var $ul = $('<ul />');

      // Перебираем список товаров
      cart.forEach(function(item) {
        // Создаем товар в списке
        var $li = $('<li />', {
          text: item.name + ' ' + item.price + ' rub.',
        });
        // Создаем кнопку для покупки
        var $button = $('<button />', {
          text: 'Buy',
          class: 'buy',
          'data-id': item.id,
          'data-name': item.name,
          'data-price': item.price,
          'data-quantityAll': item.quantityAlll,
        });

        // Добавляем все в dom
        $li.append($button);
        $ul.append($li);
      });
      // Добавляем все в dom
      $('#goods').append($ul);
    }
  })
}

(function($) {
  $(function() {
    // Рисуем корзину
    buildCart();
    // Рисуем список товаров
    buildGoodsList();

    // Слушаем нажатия на удаление товара из корзины
    $('#cart').on('click', '.delete', function() {
      // Получаем id товара, который пользователь хочет удалить
      var id = $(this).attr('data-id');
      var entity = $('#cart [data-id="' + id + '"]');
      if ($(entity).attr('data-quantity') > 1) {
              $.ajax({
          url: 'http://localhost:3000/cart/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantity: +$(entity).attr('data-quantity') - 1,
          }),
          success: function() {
            // Перестраиваем корзину
            buildCart();
          }
        })
      
      } else {
// Отправляем запрос на удаление
      $.ajax({
        url: 'http://localhost:3000/cart/' + id,
        type: 'DELETE',
        success: function() {
          // Перерисовываем корзины
          buildCart();
        }
      })
      }
    });

    // Слушаем нажатия на кнопку Купить
    $('#goods').on('click', '.buy', function() {
      // Определяем id товара, который пользователь хочет купить
      var id = $(this).attr('data-id');
      //проверяем, есть ли товар на складе
      var quantityAll = $(this).attr('data-quantityAll');
      if ( quantityAll > 0) {
        //уменьшаем количество товара на складе
          $.ajax({
          url: 'http://localhost:3000/goods/' + id,
          type: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          data: JSON.stringify({
            quantityAlll: quantityAll - 1,
          }),
          success: function() {
            // Перестраиваем товар(количество товара)
            buildGoodsList();
          }
        })
        // Пробуем найти такой товар в корзине
        var entity = $('#cart [data-id="' + id + '"]');
        if(entity.length) {
          // Товар в корзине есть, отправляем запрос на увеличение количества
          $.ajax({
            url: 'http://localhost:3000/cart/' + id,
            type: 'PATCH',
            headers: {
              'content-type': 'application/json',
            },
            data: JSON.stringify({
              quantity: +$(entity).attr('data-quantity') + 1,
            }),
            success: function() {
              // Перестраиваем корзину
              buildCart();
            }
          });
        } else {
          // Товара в корзине нет - создаем в количестве 1
          $.ajax({
            url: 'http://localhost:3000/cart',
           type: 'POST',
           headers: {
             'content-type': 'application/json',
            },
            data: JSON.stringify({
              id: id,
              quantity: 1,
              name: $(this).attr('data-name'),
             price: $(this).attr('data-price'),
            }),
            success: function() {
              // Перерисовываем корзину
             buildCart();
           }
          })
        }
      } else {
        console.log('товара больше нет!')
      }
      
    });    
  });
})(jQuery);