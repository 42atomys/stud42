import { countryNameToEmoji } from '../countryMap';

describe('countryMap has good format', () => {
  Object.keys(countryNameToEmoji).forEach((key) => {
    const emoji = countryNameToEmoji[key];

    it(`has emoji for ${key} that is a single character that is a valid emoji that is a flag`, () => {
      expect(key).toBeTruthy();
      expect(emoji).toBeTruthy();
      expect(typeof emoji).toBe('string');
      expect(emoji).toMatch(/[\u{1F1E6}-\u{1F1FF}]/u);
    });
  });
});
