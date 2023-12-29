// import { Grid } from "@mui/material";

// const Dashboard = () => {
//     return (
//         <Grid container>
//             <Grid item xs={12} lg={4}>
//                 {/* ADD SEARCH BUTTON HERE */}
//                 <h1>HERE FORM</h1>
//             </Grid>
//             <Grid item xs={12} lg={8}>
//                 <h1>HERE CALENDAR</h1>
//             </Grid>
//         </Grid>
//     )
// }

//  export default Dashboard;

import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={4}>
        <Link to="/search">
          <Button variant="contained" color="primary">
            Add Classes
          </Button>
        </Link>
        <h1>HERE FORM</h1>
      </Grid>
      <Grid item xs={12} lg={8}>
        <h1>HERE CALENDAR</h1>
      </Grid>
    </Grid>
  );
};

export default Dashboard;


// export default Dashboard;

// import React, { useState } from "react";
// import { Grid, Button } from "@mui/material";
// import Search from "./Search"; // Import the Search component
// import AddClassesPage from "./AddClassesPage"; // Import the component for adding classes

// const Dashboard = () => {
//   const [showAddClassesPage, setShowAddClassesPage] = useState(false);

//   const handleAddClassesClick = () => {
//     setShowAddClassesPage(true);
//   };

//   const handleSearchClose = () => {
//     setShowAddClassesPage(false);
//   };

//   return (
//     <Grid container>
//       <Grid item xs={12} lg={4}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddClassesClick}
//         >
//           Add Classes
//         </Button>
//       </Grid>
//       <Grid item xs={12} lg={8}>
//         <h1>HERE CALENDAR</h1>
//       </Grid>
//       {showAddClassesPage && <AddClassesPage onClose={handleSearchClose} />}
//     </Grid>
//   );
// };

// export default Dashboard;
