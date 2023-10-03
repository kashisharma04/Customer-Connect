const express = require('express')
const customerModel = require('../src/customerModel')

//=========================CREATE Customer===========================

const createCustomer = async function(req,res){
    try{
    let customerData = req.body;
    let {user_id,user_name,user_email,user_password,user_image,total_orders} = customerData;

    if(!user_id || !user_name || !user_email || !user_password || !user_image) {res.status(404).send({status : false, message:"Please fill all info!"})}

    let checkData = await customerModel.find({ user_id, user_email })
    if(checkData.length > 0) {return res.status(200).send(`The Customer is already registered.`)}
    console.log(checkData.name)

    let customer = await customerModel.create(customerData)

    res.status(201).send({ status :true, message: 'Customer created successfully', customer });
}
    catch(error){
        console.log(`error`,error.message)
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
module.exports.createCustomer = createCustomer;

//===============GET Customer/===============================================

const getCustomer = async function(req,res){
    try {
      const customer = await customerModel.find();
      res.status(200).send({status : true, customer});
    }
    catch(error){
        console.log(`error`,error.message)
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
module.exports.getCustomer = getCustomer;

//====================/PUT Customer/====================================

const updateCustomer = async function(req, res){
    try {
      const userId = req.params.user_id;
      const updatedData = req.body;
  
      const existingUser = await customerModel.findOne({ user_id: userId });
  
      if (!existingUser) {
        return res.status(404).json({ status: false, message: 'Customer not found' });
      }
  
      const updatedUser = await customerModel.findOneAndUpdate(
        { user_id: userId },
        { $set: updatedData },
        { new: true } // Return the updated document
      );
  
      res.status(200).send({ status: true, message: 'Customer details updated successfully', customer: updatedUser });
    } catch (error) {
      console.error('Error updating customer details:', error);
      res.status(500).send({ status: false, error: 'Internal Server Error' });
    }
};
  
module.exports.updateCustomer = updateCustomer;
  
//====================/DELETE Customer/====================================

const deleteCustomer = async function(req, res){
    try {
      const userId = req.params.user_id;
  
      const existingUser = await customerModel.findOne({ user_id: userId });
  
      if (!existingUser) {
        return res.status(404).send({ status: false, message: 'Customer not found' });
      }
  
      // Delete the customer record
      await customerModel.deleteOne({ user_id: userId });
  
      res.status(200).send({ status: true, message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).send({ status: false, error: 'Internal Server Error' });
    }
};
  
module.exports.deleteCustomer = deleteCustomer;