import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

//middleware

app.use(express.json());
app.use(cors());

//all currencies

app.get("/getAllCurrencies", async (req,res)=>{
const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=023f2006ad1246199304c3856035ab73";


try{
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;

    return res.json(nameData);
}catch(err){
    console.error(err);
}

});

//get the target amount
app.get("/convert",async (req,res) =>{
    const {date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency} = req.query;
        try{
            const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=023f2006ad1246199304c3856035ab73`
           const dataResponse = await axios.get(dataURL);
           const rates = dataResponse.data.rates;
            //rates
            const sourceRate = rates[sourceCurrency];
            const targetRate = rates[targetCurrency];

            //final target amount
            const targetAmount = (targetRate / sourceRate)*amountInSourceCurrency;

            return res.json(targetAmount.toFixed(2));


        }catch(err){
            console.error(err);
        }
});

//listen to a port

app.listen(5000,()=>{
    console.log("Server Statrted");
});

