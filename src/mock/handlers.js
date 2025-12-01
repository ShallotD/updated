import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";

let checklists = [
  {
    _id: uuidv4(),
    applicantName: "Alice Johnson",
    loanType: "Home Loan",
    status: "Pending",
    categories: [
      {
        documents: [
          { name: "ID Proof", status: "Pending" },
          { name: "Address Proof", status: "Pending" },
        ],
      },
    ],
  },
  {
    _id: uuidv4(),
    applicantName: "Bob Smith",
    loanType: "Car Loan",
    status: "Pending",
    categories: [
      {
        documents: [{ name: "ID Proof", status: "Submitted" }],
      },
    ],
  },
];

export const handlers = [
  rest.get("/fakeApi/checklists", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(checklists));
  }),

  rest.post("/fakeApi/checklists", async (req, res, ctx) => {
    const newChecklist = await req.json();
    newChecklist._id = uuidv4();
    checklists.push(newChecklist);
    return res(ctx.status(201), ctx.json(newChecklist));
  }),

  rest.put("/fakeApi/checklists/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updated = await req.json();
    checklists = checklists.map((c) => (c._id === id ? updated : c));
    return res(ctx.status(200), ctx.json(updated));
  }),
];
