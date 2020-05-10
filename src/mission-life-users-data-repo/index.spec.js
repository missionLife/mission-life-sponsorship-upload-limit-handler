import MissionLifeUsersDataRepo from './index';

describe('Mission Life Users Data Repo', () => {
  it('should exist', () => {
    expect(MissionLifeUsersDataRepo).toEqual(jasmine.any(Function));
  });

  let documentClientSpy;

  beforeEach(() => {
    documentClientSpy = jasmine.createSpyObj('documentClientSpy', ['put']);
    documentClientSpy.put.and.returnValue({
      promise: () => Promise.resolve({
        Items: [
          {
            SPONSORSHIP_ID: 1234,
            NAME: 'aName',
            EMAIL: 'aUserEmail@email.com',
            LAST_UPLOAD_TIMESTAMP: new Date()
          },
          {
            SPONSORSHIP_ID: 5678,
            EMAIL: 'aUserEmail@email.com',
            LAST_UPLOAD_TIMESTAMP: new Date()
          }
        ] 
      })
    });
  });

  describe('updateSupporterSponsorshipTimestamp', () => {
    it('Should update a timestamp', async () => {
      const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(
        documentClientSpy
      );

      await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp(
        'aUserEmail@email.com',
        123
      );

      expect(documentClientSpy.put).toHaveBeenCalled();
      expect(documentClientSpy.put).toHaveBeenCalledWith(
        jasmine.objectContaining({
          TableName: 'MISSION_LIFE_USERS',
          Item: jasmine.objectContaining({
            EMAIL: 'aUserEmail@email.com', 
            SPONSORSHIP_ID: 123, 
            LAST_UPLOAD_TIMESTAMP: jasmine.any(String)
          })
        })
      );
    });

    it('should throw if supporterEmail is not a string', async () => {
      const missionLifeUsersDataRepo = new MissionLifeUsersDataRepo(
        documentClientSpy
      );

      try {
        await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp(
          null,
          123
        );
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
        await missionLifeUsersDataRepo.updateSupporterSponsorshipTimestamp(
          'aUserEmail@email.com',
          null
        );
        fail();
      } catch (error) {
        expect(error.message).toContain('sponsorshipId');
      }
    });
  });
});
