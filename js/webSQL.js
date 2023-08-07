/**************** Web SQL *******************/
/* URL: http://html5doctor.com/introducing-web-sql-databases/ */

var db;

function initWebSQL()
{
    if (window.openDatabase)
    {
        db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);         //DB name, version, Text description, estimated size of db

        insertIntoDB(document.getElementById('inputName').value);
    }
    else
    {
        alert("Web SQL is not supported in your browser!");
    }
}

function insertIntoDB(value)
{
    var id = parseInt(Math.random() * (100 - 1) + 1);

    db.transaction(function (tx)
    {
        tx.executeSql('CREATE TABLE IF NOT EXISTS foo(id integer unique, name)');
        tx.executeSql("INSERT INTO foo(id, name) VALUES(?, ?)", [id, value]);
    });
}

function retrieveFromDB()
{
    if (window.openDatabase)
    {
        db.transaction(function (tx)
        {
            tx.executeSql('SELECT * FROM foo', [], function (tx, results)
            {
                var len = results.rows.length;

                for (var i = 0; i < len; i++)
                {
                    alert(results.rows.item(i).id + " : " + results.rows.item(i).name);
                }
            });
        });
    }
    else
    {
        alert("Web SQL is not supported in your browser!");
    }
}
