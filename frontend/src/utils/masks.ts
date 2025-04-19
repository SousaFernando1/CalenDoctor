/* eslint-disable prefer-const */
export function removeMask(text: string) {
  if (!text) return;

  return text.replace(/[-./*]/g, '');
}

export function onlyLetters(text: string) {
  if (!text) return;

  return text.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '');
}

export function onlyNumbers(text: string) {
  if (!text) return;

  return text.replace(/\D/g, '');
}

export function applyCEPMask(text: string) {
  if (!text) return;

  return text.replace(/\D/g, '').replace(/^(\d{5})(\d{3})+?$/, '$1-$2');
}

export function applyCNPJMask(text: string) {
  if (!text) return;

  return text
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function applyCPFMask(text: string) {
  if (!text) return;

  return text
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function applyPhoneMask(text: string) {
  if (!text) return;

  const aux = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);

  if (!aux) return '';

  return `(${aux[1]}) ${aux[2]}-${aux[3]}`;
}

export function applyCellphoneMask(text: string) {
  if (!text) return;

  const aux = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

  if (!aux) return '';

  return `(${aux[1]}) ${aux[2]}-${aux[3]}`;
}

export function convertNumberToReal(valor: number) {
  const convertedNumber = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return convertedNumber;
}

export function addEmptySpace(numberOfSpaces: number) {
  return ' '.repeat(numberOfSpaces);
}

export const getPhoneMask = (value?: string) => {
  const phoneNumber = onlyNumbers(value ?? '');

  if (!phoneNumber) return '';

  if (phoneNumber.length > 10) {
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};
