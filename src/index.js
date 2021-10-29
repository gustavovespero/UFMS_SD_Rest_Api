(async () => {
    const database = require('./database');

    const Product = require('./models/Product');
    const Customer = require('./models/Customer');
    const Employee = require('./models/Employee');
    const Order = require('./models/Employee');
    const Item = require('./models/Item');

    await database.sync();

})();

//{force: true}