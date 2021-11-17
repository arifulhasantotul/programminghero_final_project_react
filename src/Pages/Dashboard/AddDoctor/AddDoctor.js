import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";

const AddDoctor = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [image, setImage] = useState(null);
   const [success, setSuccess] = useState(false);
   const handleSubmit = (e) => {
      e.preventDefault();
      if (!image) {
         return;
      }
      const formData = new FormData();
      // getting data from state
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);

      const url = `https://vast-plains-74884.herokuapp.com/doctors`;
      fetch(url, {
         method: "POST",
         body: formData,
      })
         .then((res) => res.json())
         .then((data) => {
            if (data.insertedId) {
               setSuccess("doctor added successfully");
            }
         })
         .catch((error) => console.error("error", error));
   };

   return (
      <div>
         <h2>Add a Doctor</h2>
         <form onSubmit={handleSubmit}>
            <TextField
               sx={{ width: "50%" }}
               label="name"
               variant="outlined"
               onChange={(e) => setName(e.target.value)}
               required
            />
            <br />
            <TextField
               sx={{ width: "50%" }}
               label="email"
               type="email"
               onChange={(e) => setEmail(e.target.value)}
               variant="outlined"
               required
            />
            <br />
            <Input
               accept="image/*"
               type="file"
               onChange={(e) => setImage(e.target.files[0])}
            />
            <br />

            <Button type="submit" variant="contained">
               Add Doctor
            </Button>
         </form>
         {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
   );
};

export default AddDoctor;
