const months = [
  'Jan',
  'Febr',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const parseDate = (text) => {
  let parts = text.split(' ');
  let month = '';
  for (let i = 0; i < months.length; i += 1) {
    if (parts[1].slice(0, 3) === months[i]) {
      month = (i + 1).toString();
      break;
    }
  }
  if (month.length === 1) month = '0' + month;
  let date = parts[0].split('-')[0];
  if (date.length === 1) date = '0' + date;

  return '2022-' + month + '-' + date;
};

export const normalizeDate = (date) => {
  const arr = date.split('-');
  let result = months[parseInt(arr[1]) - 1] + ' ' + arr[2];
  return result;
};

export const calculateArrival = (date, duration) => {
  let dt = new Date(date);
  let duration_hours = Math.floor(duration / 60);
  let newts = dt.getTime() + duration_hours * 3600000 + (duration - duration_hours * 60) * 60000;
  dt.setTime(newts);
  return dt;
};

export const floatToHours = (duration) => {
  let hours = Math.floor(duration);
  let minutes = Math.floor((duration - hours) * 60);
  return hours + ' hrs ' + minutes + ' min';
};

export const minutesToHoursMinutes = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = duration - hours * 60;
  return hours + ' hrs ' + minutes + ' min';
}
