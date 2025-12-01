// import React, { useState } from "react";
// import { Box, Typography, Divider, Chip, Grid, Drawer, Button } from "@mui/material";
// import { useSelector } from "react-redux";
// import { useCreateChecklistMutation } from "../../api/checklistApi";

// const ChecklistDrawerr = ({ open, onClose, checklist: initialChecklist }) => {
//   const role = useSelector((state) => state.auth.user.role);
//   const [checklist, setChecklist] = useState(initialChecklist || null);

//   const [createChecklist, { isLoading }] = useCreateChecklistMutation();

//   // Handler to create a checklist
//   const handleCreateChecklist = async () => {
//     try {
//       const newChecklist = await createChecklist({
//         projectName: "New Project",
//         documents: [
//           { name: "Site Plan", category: "Planning", status: "pending" },
//           { name: "Structural Drawing", category: "Engineering", status: "pending" },
//         ],
//       }).unwrap();
//       setChecklist(newChecklist);
//     } catch (error) {
//       console.error("Error creating checklist:", error);
//     }
//   };

//   if (!checklist)
//     return (
//       <Drawer anchor="right" open={open} onClose={onClose}>
//         <Box sx={{ width: 500, p: 3 }}>
//           <Typography variant="h6">No Checklist Found</Typography>
//           <Divider sx={{ my: 2 }} />
//           {role === "rm" && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateChecklist}
//               disabled={isLoading}
//             >
//               {isLoading ? "Creating..." : "Create Checklist"}
//             </Button>
//           )}
//         </Box>
//       </Drawer>
//     );

//   // Group documents by category
//   const groupedDocs = checklist.documents.reduce((acc, doc) => {
//     if (!acc[doc.category]) acc[doc.category] = [];
//     acc[doc.category].push(doc);
//     return acc;
//   }, {});

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 500, p: 3 }}>
//         <Typography variant="h6">Checklist Documents</Typography>
//         <Divider sx={{ my: 2 }} />

//         {Object.keys(groupedDocs).map((category) => (
//           <Box key={category} mb={3}>
//             <Typography variant="subtitle1" fontWeight="bold" color="primary">
//               {category.toUpperCase()}
//             </Typography>
//             <Grid container spacing={2} mt={1}>
//               {groupedDocs[category].map((doc) => (
//                 <Grid item xs={12} key={doc._id}>
//                   <Box p={2} border="1px solid #ddd" borderRadius={2}>
//                     <Typography>{doc.name}</Typography>
//                     <Chip
//                       label={doc.status.toUpperCase()}
//                       color={
//                         doc.status === "uploaded"
//                           ? "success"
//                           : doc.status === "deferred"
//                           ? "warning"
//                           : "default"
//                       }
//                       size="small"
//                       sx={{ mt: 1 }}
//                     />
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         ))}
//       </Box>
//     </Drawer>
//   );
// };

// export default ChecklistDrawerr;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Button,
  Modal,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useCreateChecklistMutation } from "../../api/checklistApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: "85vh",
  overflowY: "auto",
};

const ChecklistDrawerr = ({ open, onClose, checklist: initialChecklist }) => {
  const role = useSelector((state) => state.auth.user.role);
  const [checklist, setChecklist] = useState(initialChecklist || null);

  const [selectedDocs, setSelectedDocs] = useState({});
  const [createChecklist, { isLoading }] = useCreateChecklistMutation();

  const availableDocuments = [
    { name: "Site Plan", category: "Planning" },
    { name: "Structural Drawing", category: "Engineering" },
    { name: "Environmental Clearance", category: "Compliance" },
    { name: "Electrical Layout", category: "Engineering" },
  ];

  const groupedDocs = availableDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  // Toggle selected items
  const handleSelect = (docName) => {
    setSelectedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  // Create checklist with selected docs
  const handleCreateChecklist = async () => {
    try {
      const docsToSave = availableDocuments
        .filter((d) => selectedDocs[d.name])
        .map((d) => ({
          name: d.name,
          category: d.category,
          status: "pending",
        }));

      const newChecklist = await createChecklist({
        projectName: "New Project",
        documents: docsToSave,
      }).unwrap();

      setChecklist(newChecklist);
      onClose();
    } catch (error) {
      console.error("Error creating checklist:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight="bold">
          {checklist ? "Checklist Documents" : "Create Checklist"}
        </Typography>
        <Divider sx={{ my: 2 }} />

        

        {/* If checklist exists, just show it */}
        {checklist ? (
          <>
            {Object.keys(
              checklist.documents.reduce((acc, doc) => {
                if (!acc[doc.category]) acc[doc.category] = [];
                acc[doc.category].push(doc);
                return acc;
              }, {})
            ).map((category) => (
              <Box key={category} mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                  {category.toUpperCase()}
                </Typography>

                {checklist.documents
                  .filter((d) => d.category === category)
                  .map((doc) => (
                    <Box
                      key={doc._id}
                      p={2}
                      mt={1}
                      border="1px solid #ccc"
                      borderRadius={2}
                    >
                      <Typography>{doc.name}</Typography>
                      <Typography
                        variant="caption"
                        color={
                          doc.status === "uploaded"
                            ? "green"
                            : doc.status === "deferred"
                            ? "orange"
                            : "gray"
                        }
                      >
                        {doc.status.toUpperCase()}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            ))}
          </>
        ) : (
          /* If no checklist yet — allow selecting documents */
          <>
            {Object.keys(groupedDocs).map((category) => (
              <Box key={category} mb={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {category}
                </Typography>

                <Grid container spacing={1} mt={1}>
                  {groupedDocs[category].map((doc) => (
                    <Grid item xs={12} key={doc.name}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedDocs[doc.name] || false}
                            onChange={() => handleSelect(doc.name)}
                          />
                        }
                        label={doc.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {role === "rm" && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateChecklist}
                disabled={isLoading}
                sx={{ mt: 3 }}
              >
                {isLoading ? "Creating..." : "Create Checklist"}
              </Button>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ChecklistDrawerr;
