const Employee = require('../models/Employee');

module.exports = {
    async index(req,res){
        const employees = await Employee.findAll().catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(employees);
    },

    async indexOne(req,res){
        const { id } = req.params;

        const employees = await Employee.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!employees){
            res.status(404).json({ error: "Employee not found." })
        };
        return res.status(200).json(employees);
    },

    async store(req, res){
        const { name, birth_date, role } = req.body;

        const employees = await Employee.create({ name, birth_date, role }).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        return res.status(200).json(employees);
    },

    async delete(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },

    async deleteOne(req, res){
        const { id } = req.params;

        const employee = Employee.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!employee){
            return res.status(404).json({ error: "Employee not found." })
        }else{
            await Employee.destroy({
                where: { 
                    id: id
                }
            }).then((num) => {
                if(num === 1){
                    return res.status(200).json({ msg: "Employee was deleted" });
                }
            }).catch((e) => {
                return res.status(500).json({ msg: "Failed with message: " + e });
            }); 
        }      
    },

    async update(req, res){
        return res.status(405).json({ error: 'Method not allowed' });
    },
    
    async updateOne(req, res){
        const id = req.params.id;

        const employee = await Employee.findByPk(id).catch((e) => {
            return res.status(400).json({ error: "Failed with message: " + e });
        });

        if(!employee){
            return res.status(404).json({ error: `The employee with id=${id} was not found.` })
        }else{
            Employee.update(req.body, {
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    return res.status(200).json({
                        message: "Employee was updated successfully."
                    });
                }
            })
            .catch(err => {
                return res.status(500).json({
                    error: `Error updating employee with id = ${id}. Error: ${err}`
                });
            });
        }
    },
}

