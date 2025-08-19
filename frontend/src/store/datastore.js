import { create } from 'zustand';

import dataservice from '../api/dataservice.js'

const dataStore = create(() => ({
   
    

  textFun: async (data) => {
    try {
    const res = await dataservice.sendText(data);
      return res;
    } catch (err) {
     console.log("error in SENDING TEXT",err)
    }
  },

 
  urlFun: async (url) => {
    try {
      const res = await dataservice.sendUrl(url);
      console.log(res);
    } catch (err) {
      console.error('Failed to send url',err);
    }
  },

  
  pdfFun: async (pdfFile) => {
    try {
      await dataservice.sendPdf(pdfFile);

    } catch (err) {
      console.log(err);
      
    
    } 
  },

 
 
}));

export default dataStore;