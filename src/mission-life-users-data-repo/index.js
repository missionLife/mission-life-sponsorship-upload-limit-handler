import moment from 'moment';

export class MissionLifeUsersDataRepo {
  constructor(documentClient) {
    this.documentClient = documentClient;
  }

  async updateSupporterSponsorshipTimestamp({supporterEmail, sponsorshipId}) {
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

    var params = {
      TableName: 'MISSION_LIFE_USERS',
      Key: { EMAIL : supporterEmail },
      UpdateExpression: 'set #s = :s, #l = :l',
      ExpressionAttributeNames: {
        '#s' : 'SPONSORSHIP_ID',
        '#l' : 'LAST_UPLOAD_TIMESTAMP'
      },
      ExpressionAttributeValues: {
        ':s' : sponsorshipId,
        ':l' : moment().toISOString(),
      }
    };

    return this.documentClient.update(params).promise();
  }
}