import { MissionLifeUsersDataRepo } from './index';

describe('Mission Life Users Data Repo', () => {
  it('should exist', () => {
    expect(MissionLifeUsersDataRepo).toEqual(jasmine.any(Function));
  });

  let documentClientSpy;

  beforeEach(() => {
    documentClientSpy = jasmine.createSpyObj('documentClientSpy', ['update']);
    documentClientSpy.update.and.returnValue({
      promise: () => Promise.resolve({
        TableName: 'MISSION_LIFE_USERS',
        Key: { EMAIL : 'aUserEmail@email.com' },
        UpdateExpression: 'set #s = :s, #l = :l',
        ExpressionAttributeNames: {
          '#s' : 'SPONSORSHIP_ID',
          '#l' : 'LAST_UPLOAD_TIMESTAMP'
        },
        ExpressionAttributeValues: {
          ':s' : 123,
          ':l' : 'aTimestampGoesHere',
        }
      })
    });
  });

  describe('updateSupporterSponsorshipTimestamp', () => {
    it('Should update a timestamp', async () => {
      const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(
        documentClientSpy
      );

      await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp({
        supporterEmail: 'aUserEmail@email.com',
        sponsorshipId: 123
      });

      expect(documentClientSpy.update).toHaveBeenCalled();
      expect(documentClientSpy.update).toHaveBeenCalledWith(
        jasmine.objectContaining({
          TableName: 'MISSION_LIFE_USERS',
          Key: jasmine.objectContaining({
            EMAIL: 'aUserEmail@email.com',
          }),
          UpdateExpression: 'set #s = :s, #l = :l'
        })
      );
    });

    it('should throw if supporterEmail is not a string', async () => {
      const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(
        documentClientSpy
      );

      try {
        await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp({
          supporterEmail: null,
          sponsorshipId: 123
        });
        fail();
      } catch (error) {
        expect(error.message).toContain('supporterEmail');
      }
    });

    it('should throw if sponsorshipId is not a string', async () => {
      const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(
        documentClientSpy
      );

      try {
        await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp({
          supporterEmail: 'aUserEmail@email.com',
          sponsorshipId: null
        });
        fail();
      } catch (error) {
        expect(error.message).toContain('sponsorshipId');
      }
    });
  });
});
