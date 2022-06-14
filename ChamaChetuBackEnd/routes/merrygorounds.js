const router = require("express").Router();
const Group = require("../Models/Group");
const Merrygoround = require("../Models/Merrygoround");
const User = require("../Models/User");

//create a merryGoRound
router.post("/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res
        .status(200)
        .json({ success: false, message: "The group does not exist" });
    }
    const { interval, contributionAmountPerMember } = req.body;
    const newMerryGoRound = new Merrygoround({
      interval: req.body.interval,
      contributionAmountPerMember: req.body.contributionAmountPerMember,
      groupId: group._id,
      members: group.members,
    });
    const savedMerryGoRound = await newMerryGoRound.save();

    return res
      .status(200)
      .json({
        message: "The merry-go-round has been created successfully",
        success: true,
        data: savedMerryGoRound,
      });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//start a merry go round
router.put("/start/:merrygoroundId", async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId);
    const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
    if (!merrygoround) {
      return res.status(404).json({ message: "Merry-go-round not found" });
    }
    if (merrygoround.isStarted && merrygoround.isOngoing) {
      return res
        .status(200)
        .json({
          message: "This merrygoround has already started/it is ongoing",
          success: true,
          data: merrygoround,
          group: group,
        });
    }
    await merrygoround.updateOne(
      { isStarted: true, isOngoing: true, startDate: Date.now() },
      { new: true }
    );
    await group.updateOne(
      { onGoingMerryGoRound: req.params.merrygoroundId },
      { new: true }
    );
    return res
      .status(200)
      .json({
        message: "The merry-go-round has been started successfully",
        success: true,
        data: merrygoround,
        group: group,
      });
  } catch (err) {
    return res.status(500).json(err);
  }
});
//get the current beneficiary in the members array
router.get("/currentbeneficiary/:merrygoroundId", async (req, res) => {
  try {
    //find the merrygoround
    const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
    if (!merrygoround)
      return res.status(404).json("no merry go round with such an id");
    const members = merrygoround.members;
    let currentbeneficiary;

    if (merrygoround.interval === "daily") {
      var startOfDay1 = new Date(merrygoround.startDate);
      var diffFromNow = Date.now() - startOfDay1.getTime();
      console.log(diffFromNow);
      var diffFromNowDays = diffFromNow / (24 * 60 * 60 * 1000); //turn that into a day value
      var daynum = Math.floor(diffFromNowDays % members.length); //constrain to 14 days

      console.log("todays beneficiary" + members[daynum]);
    }

    const currentBeneficiary = members[daynum];
    await merrygoround.updateOne(
      { currentBeneficiary: CurrBeneficiary },
      { new: true }
    );

    return res.status(200).json({ success: true, data: currentBeneficiary });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//view a merry go round for a specific group
router.get("/group/:merrygoroundId", async (req, res) => {
  try {
    const merrygoround = await Merrygoround.findById(req.params.merrygoroundId);
    if (!merrygoround) {
      return res
        .status(401)
        .json({ message: "No merry go round with such id" });
    }
    if (merrygoround.groupId !== req.body.groupId) {
      return res.status(401).json({ message: "wrong group id" });
    }
    return res.status(200).json({ success: true, data: merrygoround });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//view one merrygoround

//find all the  ongoing contributions for a group

//find

module.exports = router;
