function Container(id, className)
{
  this.id = id;
  this.class= className;
}
  Container.prototype.render = function()
{
  var div = document.createElement('div');
  div.className = this.className;
  div.id = this.id;
  return div;
}

Container.prototype.remove = function(delId)
{
  var elem = document.getElementById(delId);
  elem.parentNode.removeChild(elem);
}

function Menu(id, className, items){
  Container.call(this, id, className);
  this.items = items;
}
Menu.prototype = Object.create(Container.prototype);
//Menu.prototype.constructor = Menu;
Menu.prototype.render = function(){
  var ul = document.createElement('ul');
  ul.className = this.class;
  ul.id = this.id;

  this.items.forEach(function(item) {
  	if (item instanceof Container) {
  		ul.appendChild(item.render());
  	}
  })

  return ul;
}
//var menu = new Menu("my_menu", "menu_class", {});
//console.log(menu.render());

function MenuItem(href, label) {
  Container.call(this, '', 'menu-item');
  this.className = "menu-item";
  this.href = href;
  this.name = label;
}
MenuItem.prototype = Object.create(Container.prototype);
//MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function(){
  var li = document.createElement('li');
  var a = document.createElement('a');

  a.href = this.href;
  a.textContent = this.name;

  li.appendChild(a);
  li.className = this.class;

  return li;
}

/*Menu.prototype.render = function(){
var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
for(var item in this.items){
if(this.items[item] instanceof MenuItem){
result += this.items[item].render();
}
}
result += "</ul>";
return result;
}

var menu = new Menu("my_menu", "My_class", m_items);
var div = document.write(menu.render());*/