const db = require("../../models");
const Producer = db.producer;

exports.add = (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return; // Add return to exit the function if name is not provided
    }

    // Create a new producer object with the provided data
    const newProducer = {
        name,
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
        // Find all producers and select only the 'name' attribute
        const producerNames = await Producer.findAll();

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
    const { producerId } = req.params;
    try {
        const deletedProducer = await Producer.destroy({
            where: {
                id: producerId
            }
        });
        if (deletedProducer === 0) {
            res.status(404).send({
                message: `Producer with ID ${producerId} not found.`
            });
        } else {
            res.send({
                message: `Producer with ID ${producerId} deleted successfully.`
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
