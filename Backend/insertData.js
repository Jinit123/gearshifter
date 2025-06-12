require('dotenv').config();
const mongoose = require('mongoose');
const Brand = require('./models/Brand');
const Model = require('./models/Model');
const Fuel = require('./models/Fuel');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("Error connecting:", err));

async function insertData() {
    try {
        // Insert Brands
        const brandsData = await Brand.insertMany([
            { brand: "Ford", models: [] },
            { brand: "BMW", models: [] },
            { brand: "Mercedes-Benz", models: [] },
            { brand: "Audi", models: [] },
            { brand: "Nissan", models: [] },
            { brand: "Hyundai", models: [] },
            { brand: "Kia", models: [] },
            { brand: "Volvo", models: [] },
            { brand: "Jaguar", models: [] },
            { brand: "Land Rover", models: [] },
            { brand: "Tesla", models: [] },
            { brand: "Porsche", models: [] },
            { brand: "Mazda", models: [] },
            { brand: "Subaru", models: [] },
            { brand: "Renault", models: [] },
            { brand: "Volkswagen", models: [] }
        ]);

        const brandsMap = {};
        brandsData.forEach(brand => {
            brandsMap[brand.brand] = brand._id;
        });

        const modelList = {
            "Ford": ["Mustang", "Focus", "Explorer", "Fusion", "Edge", "F-150", "Bronco"],
            "BMW": ["X5", "M3", "X3", "5 Series", "7 Series", "i4", "X1"],
            "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "AMG GT", "A-Class"],
            "Audi": ["Q7", "A4", "A6", "Q5", "TT", "RS5", "A3"],
            "Nissan": ["Altima", "Rogue", "Sentra", "Versa", "Maxima", "GT-R", "X-Trail"],
            "Hyundai": ["Sonata", "Elantra", "Santa Fe", "Tucson", "Palisade", "Kona", "Creta"],
            "Kia": ["Sorento", "Seltos", "Sportage", "Telluride", "Carnival", "Sonet", "Rio"],
            "Volvo": ["XC90", "S60", "V60", "XC40", "XC60", "C40 Recharge", "V90"],
            "Jaguar": ["F-PACE", "XE", "XF", "I-PACE", "XJ", "E-PACE", "F-TYPE"],
            "Land Rover": ["Range Rover Evoque", "Range Rover Velar", "Range Rover Sport", "Defender", "Discovery", "Discovery Sport"],
            "Tesla": ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck", "Roadster"],
            "Porsche": ["Cayenne", "Panamera", "Macan", "Taycan", "911", "Boxster", "Carrera"],
            "Mazda": ["CX-5", "MX-5", "CX-30", "6 Series", "CX-9", "3 Series", "BT-50"],
            "Subaru": ["Forester", "Impreza", "Legacy", "Outback", "WRX", "Crosstrek", "BRZ"],
            "Renault": ["Duster", "Captur", "Megane", "Kadjar", "Kwid", "Arkana", "Talisman"],
            "Volkswagen": ["Golf", "Passat", "Tiguan", "ID.4", "Arteon", "Polo", "Touareg"]
        };

        // Insert Models
        const modelsData = [];
        for (const brand in modelList) {
            modelList[brand].forEach(modelName => {
                modelsData.push({ modelName, brand: brandsMap[brand] });
            });
        }

        const insertedModels = await Model.insertMany(modelsData);

        // Insert Fuel Types & Link to Models
        const fuelData = await Fuel.insertMany(insertedModels.map(model => ({
            carModel: model._id,
            fuelTypes: ["Petrol", "Diesel", "Electric", "Hybrid"].slice(0, Math.floor(Math.random() * 4) + 1) // Random fuel types
        })));

        // Update Brands to Store Model References
        for (const model of insertedModels) {
            await Brand.updateOne(
                { _id: model.brand },
                { $push: { models: model._id } }
            );
        }

        console.log("Brands, Models & Fuel Types Added Successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        mongoose.connection.close();
    }
}

insertData();