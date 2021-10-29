const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
    async index(req,res){
        const orders = await Order.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(orders);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const orders = await Order.findByPk(id, { 
            include: [
                Employee,
                Customer, 
                Product
            ]}).catch((e) => {
                return res.status(400).json({ error: "Failed with message: " + e });
            });;

        if(!orders){
            res.status(404).json({ error: "Order does not exists" })
        };
    
        return res.status(200).json(orders);
    },

    async store(req, res){
        const { customer_id, employee_id } = req.body;

        const order = await Order.create({ customer_id, employee_id }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(order);
    },

    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async deleteOne(req, res){
        const { id } = req.params;

        const order = await Order.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });
        
        if(!order){
            return res.status(404).json({ error: `Order with id=${id} does not exists.` })
        }else{
            await Order.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if(num === 1){
                    return res.status(200).json({ msg: "Order was deleted" });
                }
            }).catch((e) => {
                return res.status(500).json({ msg: "Deleting data failed with message: " + e });
            });
        }        
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const id = req.params.id;

        const order = await Order.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!order){
            return res.status(404).json({ error: `Order with id=${id} does not exists.` })
        }else{
            await Order.update(req.body, {
                where: { id: id }
            })
            .then((num) => {
                if (num == 1) {
                    return res.status(200).json({ message: "Data was updated successfully." });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Updating data failed with message: " + e });
            });
        }
    },
}