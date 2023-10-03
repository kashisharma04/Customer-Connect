const express = require('express')
const router = express.Router()
const {createCustomer, getCustomer, updateCustomer, deleteCustomer} = require('../src/customerController')

router.get('/', (req, res) => {
    res.send('Router Method !');
});
// Doctor Routes
router.post("/customer", createCustomer)
router.get("/customer/get", getCustomer)
router.get('/customer/put' , updateCustomer)
router.get('/customer/delete' , deleteCustomer)

module.exports = router;