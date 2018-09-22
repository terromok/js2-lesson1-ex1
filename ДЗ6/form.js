var validation = {
	phone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
	email: /^[-._a-z0-9]+@([a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i
};

window.onload = function() {
	$a = $('<a />', {
		href: 'form.html',
	})
	$('#reset').append($a);
	document.getElementById('submit').addEventListener('click', function(event) {
		Object.keys(validation).forEach(function(rule) {    /*делает массив ['phone', 'email']*/
			var fields = document.querySelectorAll('[data-validation-rule="' + rule + '"]');
			fields.forEach(function(field) {
				if (validation[rule].test(field.value)) {
					field.classList.remove("invalid");
				} else {
					field.classList.add("invalid");
					$(".invalid").toggle("pulsate", 10000);
					var $li = $('.invalid');
					$("#dialog").append($li);
					
				}
			});
			$("#dialog").dialog();
		});

		event.preventDefault();
	});
};


$(document).ready(function() {
/*$('#datepicker').datepicker({});
$("#datepicker").datepicker();*/
$("#datepicker").datepicker({     monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
      dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
      firstDay:1,
      dateFormat:"dd.mm.yy"
   });
});

