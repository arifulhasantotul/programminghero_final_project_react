import {
   Button,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const DashAppointments = ({ date }) => {
   const { user, token } = useAuth();
   const [appointments, setAppointments] = useState([]);
   useEffect(() => {
      const url = `https://vast-plains-74884.herokuapp.com/appointments?email=${
         user?.email
      }&&date=${date.toLocaleDateString()}`;
      fetch(url, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      })
         .then((res) => res.json())
         .then((data) => setAppointments(data));
   }, [user?.email, date, token]);
   return (
      <div>
         <h2>Appointments: {appointments.length}</h2>
         <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 650 }} aria-label="Appointments table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Time</TableCell>
                     <TableCell align="right">Service</TableCell>
                     <TableCell align="right">Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {appointments.map((row) => (
                     <TableRow
                        key={row._id}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell component="th" scope="row">
                           {row.patientName}
                        </TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        <TableCell align="right">{row.serviceName}</TableCell>
                        <TableCell align="right">
                           {row.payment ? (
                              "Paid"
                           ) : (
                              <Link to={`/dashboard/payment/${row._id}`}>
                                 {" "}
                                 <Button variant="outlined">Pay</Button>
                              </Link>
                           )}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default DashAppointments;
