import { create } from 'zustand';
import toast from 'react-hot-toast';
import chatService from '../api/chatservice.js';

const useMessageStore = create((set, get) => ({
  Ansmessage: null,
  messages: [],
  type: null,

  setType: (newType) => set({ type: newType }),

  getAnswer: async (question) => {
    try {
      const { type } = get(); // get current type from store

      // Add user message
      set((state) => ({
        messages: [
          ...state.messages,
          { answer: question, myQuestion: true },
        ],
      }));

      // Add loading message
      set((state) => ({
        messages: [
          ...get().messages,
          { answer: "", myQuestion: false, isLoading: true },
        ],
      }));

      // Fetch AI response
      const res = await chatService.fetchAnswer(question, type);

      // Reset type after fetching
      set({ type: null });

      // Use res.data since Axios returns the full response
      const answerText = typeof res.data === "string" ? res.data : res.data?.answer;

      // Update loading message with the actual answer
      set((state) => {
        const updated = [...state.messages];
        updated[updated.length - 1] = {
          answer: answerText,
          myQuestion: false,
          isLoading: false,
        };
        return { messages: updated };
      });

    } catch (error) {
      console.log(error);
      toast.error("Try Again");
    }
  },

  clear: () => set({ messages: [] }),
}));

export default useMessageStore;
