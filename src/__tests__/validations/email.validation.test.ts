import { describe, it, expect, assert } from 'vitest';
import { validateEmail, emailMask } from '@validations/email.validation.ts';

describe('validateEmail', () => {
  it('throws error - domain not specified', () => {
    const email = 'test@email';

    assert.throws(
      () => validateEmail(email),
      'Inclua o domínio do e-mail após "email".'
    );
  });
  
  it('doesn\'t throw error - domain specified', () => {
    const email = 'test@email.com';

    assert.doesNotThrow(
      () => validateEmail(email),
      'Inclua o domínio do e-mail após "email".'
    );
  });
});

describe('emailMask', () => {
  it('sanitize email', () => {
    const email = '`test-%$#~`´À@email_.c12324=+{}[]/|*ç!?:<>\';`';
    const sanitizedEmail = emailMask(email);

    expect(sanitizedEmail).toBe('test-%A@email_.c12324=+/c?:<>;');
  });
});
