export class SupporterSponsorship {
  constructor({ supporterEmail, sponsorshipId }) {
    if (!supporterEmail || typeof supporterEmail !== 'string') {
      throw new TypeError(
        `supporterEmail in SupporterSponsorship must be a string. Value provided ${supporterEmail}`
      );
    }
    if (!sponsorshipId || typeof sponsorshipId !== 'number') {
      throw new TypeError(
        `sponsorshipId in SupporterSponsorship must be a number. Value provided ${supporterEmail}`
      );
    }

    this.supporterEmail = supporterEmail;
    this.sponsorshipId = sponsorshipId;

    Object.freeze(this);
  }
}
