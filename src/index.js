import AWS from "aws-sdk";
import { MissionLifeUsersDataRepo } from "./mission-life-users-data-repo";
import { SupporterSponsorship } from './supporter-sponsorship';

AWS.config.setPromisesDependency(Promise);
AWS.config.update({ region: process.env.AWS_REGION });

const documentClient = new AWS.DynamoDB.DocumentClient();
const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(documentClient);

async function processMessageBatch(messages) {
  const batchPromises = [];
  for (let i = 0; i < messages.length; i++) {
    const supporterSponsorshipMessage = JSON.parse(messages[i].body);

    const supporterSponsorship = new SupporterSponsorship({
      supporterEmail: supporterSponsorshipMessage.supporterEmail,
      sponsorshipId: supporterSponsorshipMessage.sponsorshipId
    });

    batchPromises.push(
      missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp(supporterSponsorship)
    )
  }

  return Promise.all(batchPromises);
}

async function consume(event, context) {
  return processMessageBatch(event.Records);
}
exports.handler = async (event, context) => {
  try {
    return await consume(event, context);
  } catch (error) {
    throw new Error(
      `An error occurred in the Mission Life New User Email Notification Lambda: ${error.message}`
    );
  }
};
