export const getWorkStepColor = (workStep) => {
  switch (workStep) {
    case "Docs_Pending":
      return "bg-black text-white";
    case "Pending_Deferral":
      return "bg-orange-100 text-orange-700 border border-orange-300";
    case "Submitted":
      return "bg-red-100 text-red-700 border border-red-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
