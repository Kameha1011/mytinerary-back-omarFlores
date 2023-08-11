import City from "../models/City.js";
const controllers = {
    getCities: async (req, res) => {
       const cities = await City.find();
       res.json(cities).status(200);
    },
    createCity: async (req, res) => {
       try {
         await City.create(req.body);
         res.json({message: "city created"}).status(201);
       } catch (error) {
        res.json({
            message: error.message
        }).status(500);
       }
    },
    updateCity: (req, res) => {
        
    },
    deleteCity: (req, res) => {
        
    }
};

export default controllers