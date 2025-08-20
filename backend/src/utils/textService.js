let latestText = "";

export const setText = (textData) => {
  latestText = textData;
};

export const getText = () => latestText;