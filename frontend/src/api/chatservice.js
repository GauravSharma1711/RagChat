import axiosInstance from "./axisInstance.js";

const chatService = {

    fetchAnswer : async (question,type)=>{
       
        const res = await axiosInstance.post(`/chat`,{question,type});
     
       
        
        return res;
    }

}

export default chatService