const Customer = require('../models/Customer');

module.exports = {
    async index(req,res){
        const customers = await Customer.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(customers);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const customers = await Customer.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!customers){
            res.status(404).json({
                error: "Customer does not exists"
            })
        };

        return res.status(200).json(customers);
    },

    async store(req, res){
        const { name, birth_date } = req.body;

        const customers = await Customer.create({ name, birth_date }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(customers);
    },

    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    async deleteOne(req, res){
        const { id } = req.params;

        const customer = await Customer.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        }); 
        
        if(!customer){
            return res.status(404).json({ error: `The customer with ${id} does not exists.`})
        }else{
            await Customer.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if(num === 1){
                    return res.status(200).json({ error: "customer was deleted" });
                }
            }).catch((e) => {
                return res.status(500).json({ error: "Failed with message: " + e });
            });
        }        
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const id = req.params.id;

        const customer = await Customer.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        }); 

        if(!customer){
            return res.status(404).json({ error: `The customer with id=${id} was not found.` })
        }else{
            Customer.update(req.body, {
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    return res.status(200).json({
                        message: "Customer was updated successfully."
                    });
                }
            })
            .catch((e) => {
                return res.status(500).json({
                    error: `Error updating customer with id = ${id}. Error: ${e}`
                });
            });
        }
    },
}