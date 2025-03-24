import jwt from 'jsonwebtoken'

const authMiddleware = async(req, res, next) =>{

    // getting the token from req.headers
    const {token} = req.headers;
    if(!token)
        {
            return res.json({success:false,message:"Not authorized,Login again"})
        }

        try {
            // decoding the token
            const token_decode = jwt.verify(token,process.env.JWT_SECRET)
            // converting token into userId
            // with the help of userId we will add, remove,get data
            req.body.userId = token_decode.id;
            next();
        } catch (error) {

            console.log(error)
            res.json({success:false, message:"Error"})
        }

}

export default authMiddleware;