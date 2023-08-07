/**************** File API ****************/

var content = document.getElementById('content');

if (!window.FileReader) 
{
  content.innerHTML = "<p>This browser doesnt support the File API</p>";
}
else 
{
	// Page Layout
	content.innerHTML = '<p>Pick a text file or drag one into this area <br> <input type="file" id="file" /></p>' +
		'<ul><li>Name: <span id="name"></span></li>' +
		'<li>File Size: <span id="size"></span></li>' +
		'<li>File Type: <span id="type"></span></li>' +
		'<li>Last Modified: <span id="last"></span></li>' +
	'</ul>';
	
	// Input handler
	document.getElementById('file').onchange = function () 
	{
		displayFileMeta(this.files[0]);
	};

	// Drag and drop methods
	content.ondragover = function (e) 
	{
		e.preventDefault();
		return false;
	};
	content.ondrop = function (event) 
	{
		e.stopPropagation();
		displayFileMeta(event.dataTransfer.files[0]);
		return false;
	};

	// Prints out file properties.
	function displayFileMeta(file) 
	{
		console.log(file);

		document.getElementById('name').textContent = file.name;
		document.getElementById('size').textContent = file.size;
		document.getElementById('type').textContent = file.type;
		document.getElementById('last').textContent = file.lastModifiedDate.toString();
	}
}