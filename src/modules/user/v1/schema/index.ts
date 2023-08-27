
import {z } from "zod"

export const registerUserSchema =z.object ({
    body:  z.object({
        name:z.string({
            required_error: "Name is Required",
            invalid_type_error:"String Required"
        }).min(5),
        email:z.string({
            required_error:"Email is Required",
            invalid_type_error: "String Required"
        }).email("Not a valid Email"),
        password:z.string({
            required_error:"Password is Required",
            invalid_type_error: "String Required"
        }).min(6,"Minimum length of password should be 6"),
   
        phoneNo:z.number({
            required_error:"empty phone number",
        }).min(12,"Minimum length should be 12"),
        address:z.string()

    })
})

export const loginSchema=z.object ({
    body:z.object({
        email:z.string({
            required_error:"Email is Required",
            invalid_type_error: "String Required"
        }).email("Not a valid Email"),
        password:z.string({
            required_error:"Password is Required",
            invalid_type_error: "String Required"
        }).min(6,"Minimum length of password should be 6"),
    })
})


  


    

