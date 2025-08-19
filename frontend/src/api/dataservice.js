import axiosInstance from "./axisInstance.js";


const dataervice = {

     sendText :  async (data)=>{
     const res = await axiosInstance.post('/data/text', { text: data });
     return res.data;
     },

       sendPdf : async (pdfFile)=>{

            const formData = new FormData();
           formData.append("pdf", pdfFile);

      const res = await axiosInstance.post('/data/pdf', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
       return res.data;
     },

          sendUrl : async (url)=>{
          const res = await axiosInstance.post('/data/url',{url})
          return res.data;
     }

}

export default dataervice