// https://codepen.io/vsync/pen/frudD
// Applied globally on all textareas with the "autoExpand" class
$(document)
.one('focus.autoexpand', 'textarea.autoexpand', function(){
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
})
.on('input.autoexpand', 'textarea.autoexpand', function(){
    var minRows = this.getAttribute('data-min-rows')|0, rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
    this.rows = minRows + rows;
});

function autoexpand(obj) {
  var savedValue = obj.value;
  obj.value = '';
  obj.baseScrollHeight = obj.scrollHeight;
  obj.value = savedValue;

  var minRows = obj.getAttribute('data-min-rows')|0, rows;
  obj.rows = minRows;
  rows = Math.ceil((obj.scrollHeight - obj.baseScrollHeight) / 16);
  obj.rows = minRows + rows;
}