import { clerkClient } from "@clerk/express";

//Middleware (protect routes cho educator)
 export const protectEducator = async (req, res, next)=> {
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)

        if(response.publicMetadata.role !== 'educator'){
            return res.json({ success: false, message: 'Bạn Không Phải Người Dạy, Không Thể Thực Hiện Tác Vụ Này' })
        }

        next()

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

