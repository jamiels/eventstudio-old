const db = require("../../models");
const Producer = db.producer;

exports.add = (req, res) => {
    const { name, space_id } = req.body;
    if (!name || !space_id) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return; // Add return to exit the function if name is not provided
    }

    // Create a new producer object with the provided data
    const newProducer = {
        name,
        space_id,
    };

    // Use the Producer model to create a new producer in the database
    Producer.create(newProducer)
        .then(data => {
            res.send({ success: true, producer: data });
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while saving new Producer",
                errObj: err
            });
        });
};

exports.getAllProducerNames = async (req, res) => {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            return res.status(400).send({ message: "spaceId not found." });
        }        // Find all producers and select only the 'name' attribute
        const producerNames = await Producer.findAll({ where: { space_id: spaceId } });

        res.send({ producerNames });
    } catch (err) {
        console.error("Error fetching producer names:", err);
        res.status(500).send({
            message: "An error occurred while fetching producer names",
            errObj: err
        });
    }
};

exports.deleteProducer = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProducer = await Producer.destroy({
            where: {
                id: id
            }
        });
        if (deletedProducer === 0) {
            res.status(404).send({
                message: `Producer with ID ${id} not found.`
            });
        } else {
            res.send({
                message: `Producer with ID ${id} deleted successfully.`
            });
        }
    } catch (err) {
        console.error("Error deleting producer:", err);
        res.status(500).send({
            message: "An error occurred while deleting producer",
            errObj: err
        });
    }
};

exports.updateProducer = async (req, res) => {
    const id = req.params.id;
    const updateProducer = req.body;

    try {
        const producer = await Producer.findByPk(id);
        if (!producer) {
            return res.status(404).send({ message: "Producer not found." });
        }

        await Producer.update(updateProducer, { where: { id } });
        res.send({ success: true, producer: updateProducer });
    } catch (err) {
        res.status(500).send({
            message: "Error updating producer with id=" + id,
            errObj: err
        });
    }
};