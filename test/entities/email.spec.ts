import { Email } from '@/entities';

describe('Email validation', () => {
  it('should not accept empty strings', () => {
    const email = '';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should accept valid email', () => {
    const email = 'any@mail.com';
    expect(Email.validate(email)).toBeTruthy();
  });
  it('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept strings larger than 320 chars', () => {
    const email =
      'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127);
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127);
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept empty local part', () => {
    const email = '@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept empty domain part', () => {
    const email = 'any@';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept domain part larger than 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept local part with invalid char', () => {
    const email = 'any email@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept local part with two dots', () => {
    const email = 'any..email@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept local part with ending dot', () => {
    const email = 'any.@mail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
  it('should not accept email without an at-sign', () => {
    const email = 'anymail.com';
    expect(Email.validate(email)).toBeFalsy();
  });
});
