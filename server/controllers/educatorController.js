import { clerkClient } from "@clerk/express";



//update thành người dạy
export const updateRoleToEducator = async (req, res)=> {
    try{
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'Bạn Đã Có Thể Đăng Khóa Học Của Mình'})

    }catch(error){
        res.json({ success: false, message: error.message})
    }
}