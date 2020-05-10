export default class MissionLifeUsersDataRepo {
  constructor(documentClient) {
    this.documentClient = documentClient;
  }

  async updateSupporterSponsorshipTimestamp(supporterEmail, sponsorshipId) {
    if (!supporterEmail || typeof supporterEmail !== 'string') {
      throw new TypeError(
        `MissionLifeUsersDataRepo - updateSupporterSponsorshipTimestamp - supporterEmail must be a string. Value Provided: ${supporterEmail}`
      );
    }
    if (!sponsorshipId || typeof sponsorshipId !== 'number') {
      throw new TypeError(
        `MissionLifeUsersDataRepo - updateSupporterSponsorshipTimestamp - sponsorshipId must be a number. Value Provided: ${sponsorshipId}`
      );
    }
    let putItemParams = {
      TableName: 'MISSION_LIFE_USERS',
      Item: {
        EMAIL: supporterEmail,
        SPONSORSHIP_ID: sponsorshipId,
        LAST_UPLOAD_TIMESTAMP: new Date().toString()
      }
    }

    return this.documentClient.put(putItemParams).promise();
  }
}