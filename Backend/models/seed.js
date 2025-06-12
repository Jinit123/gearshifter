const mongoose = require("mongoose");
const City = require("./City");
const Brand = require("./Brand");
const Model = require("./Model");
const Service = require("./Service");
const Fuel = require("./Fuel");

mongoose.connect("mongodb://localhost:27017/gear-shifter")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Database Connection Error:", err));

async function seedDatabase() {

    await City.insertMany([{ name: "Ahmedabad" }, { name: "Mumbai" }, { name: "Delhi" }]);


    const toyota = await Brand.create({ brand: "Toyota", models: [] });
    const honda = await Brand.create({ brand: "Honda", models: [] });

    const corolla = await Model.create({ modelName: "Corolla", brand: toyota._id });
    const civic = await Model.create({ modelName: "Civic", brand: honda._id });

    await Brand.updateOne({ _id: toyota._id }, { $push: { models: corolla._id } });
    await Brand.updateOne({ _id: honda._id }, { $push: { models: civic._id } });

    await Service.insertMany([
        { carModel: corolla._id, services: [{ name: "Oil Change", price: 1000 }, { name: "Brake Service", price: 2500 }] },
        { carModel: civic._id, services: [{ name: "Tire Replacement", price: 3500 }, { name: "Engine Diagnostics", price: 2000 }] }
    ]);

    // Fuel Types
    await Fuel.insertMany([{ carModel: corolla._id, fuelType: "Petrol" }, { carModel: civic._id, fuelType: "Diesel" }]);

    console.log("Data Seeding Completed!");
    mongoose.connection.close();
}

seedDatabase();