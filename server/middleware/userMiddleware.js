const jwt = require('jsonwebtoken');

const isUser = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        console.log(token, "in here middleware token ");
        if (!token) {
            return res.status(401).json({ error: "Token is invalid or not found" });
        }
        let tokenArr = token?.split(" ");
        token = tokenArr.length > 1 ? tokenArr[1] : "";
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("completedthe middleware //////////////////////// ")
};

module.exports = isUser;

// 
// const isAdmin = (req, res, next) => {
//     let token = req.headers.authorization;
//     console.log(req.headers.authorization, "in middleware token ")
//     console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);
//     if (!token) return RES(res, STATUS.UNAUTHORIZED, "You are not authorized to access the token")
//     let tokenArr = token?.split(" ");
//     token = tokenArr.length > 1 ? tokenArr[1] : ""
//     if (!token) {
//         return RES(res, STATUS.UNAUTHORIZED, 'Token is required');
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         console.log("", decoded)
//         if (decoded.role !== 'ADMIN') {
//             return RES(res, STATUS.FORBIDDEN, 'Access denied, not an admin');
//         }
//         req.adminId = decoded.id;
//         next();
//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.UNAUTHORIZED, 'Invalid token');
//     }
// };
// module.exports = isAdmin;











// sending token from frontend extract it here  and use user authentication as a middleware 










