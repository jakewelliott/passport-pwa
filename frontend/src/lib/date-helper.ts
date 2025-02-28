// TODO: come up with a more generic date helper / naming convention
// our mess will live here, just use DateHelper to export any code in here

const fromString = (date: string) => {
  return new Date(Date.parse(date));
};

const toStringLong = (date: Date) =>
  date.toLocaleString('default', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeStyle: undefined,
    dateStyle: undefined,
  });

const toStringShort = (date: Date) =>
  date.toLocaleString('default', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default {
  fromString,
  parse: fromString,
  stringify: toStringLong,
  toStringLong,
  toStringShort,
};
