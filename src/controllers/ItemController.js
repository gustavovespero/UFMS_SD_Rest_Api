const Order = require('../models/Order');
const Item = require('../models/Item');

module.exports = {
    async index(req,res){
        
        const items = await Item.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(items);
    },

    async indexOne(req,res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async store(req, res){
        var { order_id, id } = req.params;
        const { quantity, product_id } = req.body;

        const order = await Order.findByPk(order_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!order){
            return res.status(404).json({ error: 'Order not found' });
        }
        
        id = `O${order_id}I${id}`;

        const item = await Item.create({ 
            id,
            order_id,
            product_id, 
            quantity 
        }).catch((e) => {
            return res.status(400).json({ error: "Creating failed with message: " + e });
        });;

        return res.json(item);
    },
    
    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    async deleteOne(req, res){
        const { order_id } = req.params;
        const { id } = req.params;

        const item_id = `O${order_id}I${id}`;

        const order = await Order.findByPk(order_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const item = await Item.findByPk(item_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!order){
            return res.status(404).json({ error: 'Order not found' });
        }else if(!item){
            return res.status(404).json({ error: 'Item not found' });
        };

        await Item.destroy({
            where: { 
                id: item_id
            }
        }).then((num) => {
            if (num == 1) {
                return res.status(200).json({
                    message: "Data was deleted successfully."
                });
            } else {
                return res.status(400).json({
                    error: `Data was not deleted.`
                });
            }
        }).catch((e) => {
            return res.status(500).json({ error: "Failed with message: " + e });
        });       
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const { order_id } = req.params;
        const { id } = req.params;

        const item_id = `O${order_id}I${id}`;

        const order = await Order.findByPk(order_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        const item = await Item.findByPk(item_id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!order){
            return res.status(404).json({ error: 'Order not found' });
        }else if(!item){
            return res.status(404).json({ error: 'Item not found' });
        };

        await Item.update(req.body, {
            where: { 
                id: item_id
            }
        }).then((num) => {
            if (num == 1) {
                return res.status(200).json({
                    message: "Data was updated successfully."
                });
            } else {
                return res.status(400).json({
                    error: `Data was not updated.`
                });
            }
        }).catch((e) => {
            return res.status(500).json({ error: "Failed with message: " + e });
        });       
    },
};