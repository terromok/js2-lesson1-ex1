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

function MenuItem(href, label) {
  Container.call(this, '', 'menu-item');
  this.className = "menu-item";
  this.href = href;
  this.name = label;
}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.render = function(){
  var li = document.createElement('li');
  var a = document.createElement('a');

  a.href = this.href;
  a.textContent = this.name;

  li.appendChild(a);
  li.className = this.class;

  return li;
}

function SuperMenu(id, className, items, label, href) {
  Menu.call(this, id, className, items)
  this.label = label;
  this.href = href;
}

SuperMenu.prototype = Object.create(Menu.prototype);
SuperMenu.prototype.render = function() {
  if (this.label && this.href) {
    var menuItem = new MenuItem(this.href, this.label).render();
    menuItem.appendChild(Menu.prototype.render.call(this));
    return menuItem;
  } else {
    return Menu.prototype.render.call(this);
  }
}