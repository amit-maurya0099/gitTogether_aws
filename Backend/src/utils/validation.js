const validator=require('validator')
const validateSignUpData=(req)=>{
    const {firstName,email,password}=req.body;
    if(!firstName || !email || !password ){
        throw new Error('All required fields must be present')
    }
    else if(firstName.length < 3 || firstName.length >50  ){
        throw new Error('firstname should be between 3-50 characters')
    }
    else if(!validator.isEmail(email)){
        throw new Error('Invalid Email');
    }
}
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","skills","about","githubUrl","linkedInUrl","avatar"]
    const isAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field))
    return isAllowed;

}
module.exports={validateSignUpData,validateEditProfileData};