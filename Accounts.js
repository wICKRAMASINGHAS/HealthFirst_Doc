const router = require("express").Router();
const Accounts = require("../Models/Accounts");

router.route("/add").post(async (req, res) => {
  try {
    const {
      FullName,
      Gender,
      NIC,
      DOB,
      Nationality,
      Address,
      PhoneNo,
      Email,
      Annual_Income,
      Purpose_of_Account,
      PEP,
    } = req.body;

    const newAccounts = new Accounts({
      FullName,
      Gender,
      NIC,
      DOB,
      Nationality,
      Address,
      PhoneNo,
      Email,
      Annual_Income,
      Purpose_of_Account,
      PEP,
    });

    await newAccounts.save();
    res.status(201).json({ status: "Account Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Error creating account" });
  }
});

// This route accepts a GET request to retrieve all accounts from the database.
// It returns a JSON array of account documents.
router.route("/").get((req,res)=>{
  Accounts.find().then((Accounts)=>{
    res.json(Accounts)
  }).catch((err)=>{
    console.log(err);
  })
})

// This route accepts a PUT request to update an existing account in the database.
// It expects a JSON body with the fields to be updated.
// The :id parameter is used to specify the account to update.
router.route("/update/:id").put(async(req,res)=>{
  let userID = req.params.id;

  //destructure the fields from the request body
  const {FullName, Gender, NIC, DOB, Nationality, Address, PhoneNo, Email, Annual_Income, Purpose_of_Account, PEP}= req.body;

  const updateAccount = {
    FullName,
    Gender,
    NIC,
    DOB,
    Nationality,
    Address,
    PhoneNo,
    Email,
    Annual_Income,
    Purpose_of_Account,
    PEP
  }

  const update = await Accounts.findByIdAndUpdate(userID,updateAccount).then(()=>{
    res.status(200).send({Status:"User Updated"})
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({Status:"Error with updating data"})
  })
})

// This route accepts a DELETE request to delete an existing account from the database.
// The :id parameter is used to specify the account to delete.
router.route("/delete/:id").delete(async(req,res)=>{
  let userID = req.params.id;

  await Accounts.findByIdAndDelete(userID).then(()=> {
    res.status(200).send({Status:"User Deleted"})
  }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({Status:"Error with deleting data",error: err.message});;
  })
})

// This route accepts a GET request to retrieve a single account from the database by its ID.
// The :id parameter is used to specify the account to retrieve.
router.route("/get/:id").get(async (req,res) =>{
  let userID = req.params.id;
  const user = await Accounts.findById(userID)
  .then(()=>{
    res.status(200).send({Status:"User fetched", user: user})
  }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({Status:"Error with get user ",error: err.message});
  }) 
})

module.exports = router;