window.onload = function () {
	document.getElementById('send').addEventListener('click', function(event) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:3000/items');
		xhr.send();

		xhr.onreadystatechange = function() {
			if(xhr.readyState === XMLHttpRequest.DONE) {
				var items = JSON.parse(xhr.responseText);
				//console.log(items.submenu);
				items = items.map(function(item) {
					if (item.submenu === undefined) {
						//console.log(item.submenu);
						return new MenuItem(item.href, item.label);}
					else { //console.log('fghjfjjf');
						return new SuperMenu('childMenu', 'childMenu', [
					new MenuItem(item.submenu.href, item.submenu.label),
					], item.label, item.href)
					}
				});
				var menu = new Menu('menu', 'menu', items);

				document.body.appendChild(menu.render());

			}
		};
		event.preventDefault();
	});
}