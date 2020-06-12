const Business = require('../models/business.model')

exports.configure = (req, res, next) => {
    const company_id = req.body.company_id;
    
    if (!company_id) {
        res.status(400).send({ response: 'Company ID is required' })
    }

    Business.findOne({ company_id }).then(business => {
        if (business) {
            return res.status(409).send({ response:  'Company with the ID already exist' })
        } else {
            const newBusiness = new Business({
                company_id
            })
            newBusiness.save().then(business => {
                res.status(201).send({ success: true, business })
            })       
        }
    })
}