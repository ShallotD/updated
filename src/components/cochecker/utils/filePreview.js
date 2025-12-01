export const getFilePreview = (file) => {
  if (!file) return null;

  const type = file.type;

  const icons = {
    image: "https://cdn-icons-png.flaticon.com/512/685/685655.png",
    pdf: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
    word: "https://cdn-icons-png.flaticon.com/512/888/888874.png",
    excel: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    default: "https://cdn-icons-png.flaticon.com/512/716/716784.png",
  };

  if (type.startsWith("image/")) return icons.image;
  if (type === "application/pdf") return icons.pdf;
  if (type.includes("word")) return icons.word;
  if (type.includes("excel")) return icons.excel;

  return icons.default;
};
