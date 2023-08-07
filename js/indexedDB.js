/**************** IndexedDB ****************/
/**** URL: http://www.codeproject.com/Articles/325135/Getting-Started-with-IndexedDB/ ****/

var peopleData =
[
    { name: "John Dow", email: "john@company.com" },
    { name: "Don Dow", email: "don@company.com" }
];

var idb;
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

//Calling initDB() to initialize the IndexedDB

initIDB();

function initIDB()
{
    var request = indexedDB.open("PeopleDB", 1);

    request.onsuccess = function (evt)
    {
        //alert("success");

        idb = request.result;
    };

    request.onerror = function (evt)
    {
        console.log("IndexedDB error: " + evt.target.errorCode);
    };

    request.onupgradeneeded = function (evt)
    {
        //alert("upgrade");

        //Create 'people' object store with 'id' as the keypath with autoIncrement attribute acting as a key generator

        var objectStore = evt.currentTarget.result.createObjectStore("people", { keyPath: "id", autoIncrement: true });

        //Define index on properties. Set email as unique

        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });

        //Add the Associative array to the object store

        for (var i in peopleData)
        {
            objectStore.add(peopleData[i]);
        }
    };
}

function addItemToIDB()
{
    var nameVal = $('#t_name').val();
    var emailVal = $('#t_email').val();

    //initIDB();

    var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

    var transaction = idb.transaction("people", IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore("people");
    var request = objectStore.add({ name: nameVal, email: emailVal });

    request.onsuccess = function (evt)
    {
        //Do something when the 'add' succeeded                          

        alert("Entry added.");
    };
    transaction.oncomplete = function (evt)
    {
        //Do something after the transaction completed 


    };
}

function retrieveFromIDB()
{
    //initIDB();

    var output = $("#printOutput");
    output.html("");
    var transaction = idb.transaction("people", IDBTransaction.READ_WRITE);
    var objectStore = transaction.objectStore("people");

    var request = objectStore.openCursor();

    request.onsuccess = function (evt)
    {
        var cursor = evt.target.result;

        if (cursor)
        {
            output.html(output.html() + "ID: " + cursor.key + " is " + cursor.value.name + "<br />");
            cursor.continue();
        }
        else
        {
            console.log("No more entries!");
        }
    };
}