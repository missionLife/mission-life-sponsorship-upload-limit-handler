import SupporterSponsorship from './index';

describe('Supporter Sponsorship', () => {
  it('should exist', () => {
    expect(SupporterSponsorship).toEqual(jasmine.any(Function));
  });

  describe('constructor', () => {

    let options;

    beforeEach(() => {
      options = {
        supporterEmail: 'aSupporterEmail@email.com',
        sponsorshipId: 123
      }
    })
    it('should throw if supporterEmail is not a string', () => {
      options.supporterEmail = null;
      expect(() => new SupporterSponsorship(options)).toThrowError(/supporterEmail/);
    });
    it('should throw if supporterEmail is not a string', () => {
      options.supporterEmail = undefined;
      expect(() => new SupporterSponsorship(options)).toThrowError(/supporterEmail/);
    });
    it('should throw if supporterEmail is not a string', () => {
      options.supporterEmail = 12345;
      expect(() => new SupporterSponsorship(options)).toThrowError(/supporterEmail/);
    });
    it('should throw if supporterEmail is not a string', () => {
      options.supporterEmail = [];
      expect(() => new SupporterSponsorship(options)).toThrowError(/supporterEmail/);
    });

    it('should throw if sponsorshipId is not a number', () => {
      options.sponsorshipId = 'notAnId';
      expect(() => new SupporterSponsorship(options)).toThrowError(/sponsorshipId/);
    });
    it('should throw if sponsorshipId is not a number', () => {
      options.sponsorshipId = [];
      expect(() => new SupporterSponsorship(options)).toThrowError(/sponsorshipId/);
    });
    it('should throw if sponsorshipId is not a number', () => {
      options.sponsorshipId = true;
      expect(() => new SupporterSponsorship(options)).toThrowError(/sponsorshipId/);
    });

    it('should have properties that are frozen', () => {
      const supporterSponsorship = new SupporterSponsorship(options);

      expect(() => supporterSponsorship.supporterEmail = 'aSecondUserEmail@email.com').toThrowError(/supporterEmail/);
    });
  });
});