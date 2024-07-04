import Transaction from "../models/transaction.model.js"

const transactionResolver = {
    Query: {
        transactions: async(_,_, context) =>{
            try{
              if(!context.getUser()) 
                throw new Error("Unauthorized")
                const userId = context.getUser()._id;
                const transactions = await Transaction.find({ userId});
              return transactions
            }catch(err){
                console.error("Error in getting transaction", err);
                throw new Error("Error getting transactions");  
            }
        },
        transaction: async(_, { transactionId}, ) =>{
try{
const transaction = await transaction.findById(transactionId)
return transaction;
}catch(err){
console.error("Error getting trasnaction", err);
throw new Error("Error getting transaction");

}
        },
        
    },
    Mutation: {}
}

export default transactionResolver;