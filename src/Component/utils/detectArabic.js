export const isRTL = (text) => {
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return rtlRegex.test(text);
  };